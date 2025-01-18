import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import React, { useState, useEffect } from "react";
import "./addexpense.css";

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("expensesDatabase", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("expenses")) {
        const store = db.createObjectStore("expenses", {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("date", "date", { unique: false });
        store.createIndex("day", "day", { unique: false });
        store.createIndex("category", "category", { unique: false });
        console.log("Object store 'expenses' created.");
      }
    };

    request.onerror = (e) => {
      reject(`Error opening database: ${e.target.error}`);
    };

    request.onsuccess = (e) => {
      const db = e.target.result;

      // Check if the required object store exists
      if (!db.objectStoreNames.contains("expenses")) {
        console.error("Object store 'expenses' is missing. Resetting database.");
        db.close();
        indexedDB.deleteDatabase("expensesDatabase");
        window.location.reload(); // Reload the app to initialize the database
      } else {
        resolve(db);
      }
    };
  });
};

// Function to store data in IndexedDB
const storeData = async (data) => {
  try {
    const db = await openDb();
    const transaction = db.transaction("expenses", "readwrite");
    const store = transaction.objectStore("expenses");

    // Add current date and day to the data
    const date = new Date();
    data.date = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    data.day = date.toLocaleString("en-US", { weekday: "long" }); // Get the day name

    store.add(data);

    transaction.oncomplete = () => {
      console.log("Data added successfully");
    };

    transaction.onerror = (e) => {
      console.error("Error storing data:", e.target.error);
    };
  } catch (error) {
    console.error("Error opening IndexedDB:", error);
  }
};

// Function to get the last expense from IndexedDB
const getLastExpense = async () => {
  try {
    const db = await openDb();
    const transaction = db.transaction("expenses", "readonly");
    const store = transaction.objectStore("expenses");
    const request = store.openCursor(null, "prev"); // Opens cursor in reverse order to get the last entry

    return new Promise((resolve, reject) => {
      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          resolve(cursor.value); // Get the data of the last expense
        } else {
          resolve(null); // No data found
        }
      };
      request.onerror = (e) =>
        reject(`Error retrieving data: ${e.target.error}`);
    });
  } catch (error) {
    console.error("Error fetching last expense:", error);
    return null;
  }
};

function Addexpense() {
  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [lastExpense, setLastExpense] = useState(null); // State to hold the last expense

  // Fetch the last expense on component mount
  useEffect(() => {
    const fetchLastExpense = async () => {
      const expense = await getLastExpense();
      setLastExpense(expense);
    };

    fetchLastExpense();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create data object to store in IndexedDB
    const data = {
      item,
      amount: parseFloat(amount),
      category,
      description,
    };

    // Store data in IndexedDB
    storeData(data);

    // Clear form inputs
    setItem("");
    setAmount("");
    setCategory("Food");
    setDescription("");

    // Fetch the updated last expense
    getLastExpense().then((expense) => setLastExpense(expense));
  };

  return (
    <>
      <Navbar />
      <div className="addexpense">
        <h1 className="Title">Expense Form</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputs">
            <label>
              <b>What I bought?</b>
            </label>
            <br />
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label>
              <b>Amount</b>
            </label>
            <br />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="inputs">
            <label>
              <b>Category</b>
            </label>
            <br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="groceries">Groceries</option>
              <option value="clothing">Clothing</option>
              <option value="electronics">Electronics</option>
              <option value="Health&beauty">Health and Beauty</option>
              <option value="entertainment">Entertainment</option>
              <option value="furniture&decor">Furniture and Home Decor</option>
              <option value="travel&leisure">Travel and Leisure</option>
              <option value="sports&outdoors">Sports and Outdoors</option>
              <option value="automotive">Automotive</option>
              <option value="education&learning">Education and Learning</option>
              <option value="toys&Games">Toys and Games</option>
              <option value="petSupplies">Pet Supplies</option>
              <option value="officeSupplies">Office Supplies</option>
              <option value="homeImprovement">Home Improvement</option>
              <option value="gifts&specialOccasions">
                Gifts and Special Occasions
              </option>
              <option value="Taxes">
                Taxes
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>
          <div className="inputs">
            <label>
              <b>Description</b>
            </label>
            <br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="submit">
            <button type="submit">
              <b>Submit</b>
            </button>
          </div>
        </form>
        <h1 className="Title2">Your Last Expense</h1>
        {lastExpense ? (
          <div className="prev">
            <ul className="lastlist">
              <li>Product: {lastExpense.item}</li>
              <li>Amount: {lastExpense.amount}</li>
              <li>Category: {lastExpense.category}</li>
              <li>Description: {lastExpense.description}</li>
              <li>Date: {lastExpense.date}</li>
              <li>Day: {lastExpense.day}</li>
            </ul>
          </div>
        ) : (
          <h1>
            <b>No expenses recorded yet.</b>
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Addexpense;
