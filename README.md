# 💰 Personal Finance Tracker

A modern, beautiful, and intuitive web application to help you track your income and expenses, visualize your spending patterns, and take control of your financial health.

![Finance Tracker](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Table of Contents

- [Features](#-features)
- [Problem Statement](#-problem-statement)
- [Technologies Used](#-technologies-used)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## ✨ Features

### Core Functionality
- ✅ **Add Transactions** - Record income and expenses with descriptions, amounts, and categories
- ✅ **Real-time Balance Calculation** - Automatically calculates total balance (Income - Expenses)
- ✅ **Category Management** - Organize transactions into 9 predefined categories
- ✅ **Transaction History** - View all transactions in a scrollable, organized list
- ✅ **Delete Transactions** - Remove individual transactions or clear all at once
- ✅ **Data Persistence** - All data saved locally using localStorage API

### Visual Analytics
- 📊 **Custom Pie Chart** - Visual breakdown of expenses by category
- 📈 **Percentage Display** - See what percentage each category represents
- 🎨 **Color-coded Categories** - Easy identification with distinct colors
- 🔢 **Dashboard Cards** - Quick overview of balance, income, and expenses

### Design & UX
- 🎨 **Modern Glassmorphism UI** - Beautiful frosted glass effect
- 🌈 **Gradient Background** - Eye-catching purple-to-pink gradient
- ✨ **Smooth Animations** - Fade-in, slide-in, and hover effects
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎯 **Intuitive Interface** - Clean and easy to navigate
- 🔤 **Category Icons** - Visual emoji icons for better recognition

## 🎯 Problem Statement

### The Challenge
Many people struggle to:
- Keep track of their daily income and expenses
- Understand where their money is going
- Visualize their spending patterns
- Maintain financial discipline

### The Solution
This Personal Finance Tracker provides:
- **Simple Transaction Logging** - Quick and easy way to record every financial transaction
- **Automatic Calculations** - No manual math required, see your balance instantly
- **Visual Insights** - Pie chart shows exactly where your money is being spent
- **Persistent Storage** - Your data is saved locally, no account or login required
- **Category-based Analysis** - Understand spending habits by grouping similar expenses

### Real-world Application
Perfect for:
- Students managing allowances
- Freelancers tracking project income
- Families budgeting household expenses
- Anyone wanting to improve financial awareness

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with:
  - Flexbox & Grid layouts
  - CSS animations and transitions
  - Glassmorphism effects
  - Custom scrollbars
  - Media queries for responsiveness
- **Vanilla JavaScript** - Pure JS with:
  - ES6+ features (arrow functions, template literals, destructuring)
  - DOM manipulation
  - Event handling
  - LocalStorage API
  - Canvas API for chart rendering

**No frameworks, no libraries, no dependencies!** 🚀

## 📥 Installation

### Option 1: Clone the Repository
```bash
# Clone the repository
git clone https://github.com/aryankanchan018/new-demo-.git

# Navigate to the project directory
cd new-demo-

# Open index.html in your browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux
```

### Option 2: Download ZIP
1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file
4. Open `index.html` in your web browser

## 🚀 Usage

### Adding a Transaction
1. Fill in the **Description** (e.g., "Monthly Salary", "Grocery Shopping")
2. Enter the **Amount** (e.g., 5000.00)
3. Select a **Category** from the dropdown
4. Choose transaction **Type** (Income or Expense)
5. Click **Add Transaction** button

### Viewing Your Finances
- **Dashboard Cards** - See your total balance, income, and expenses at the top
- **Expense Chart** - Visual breakdown of where your money is going
- **Transaction List** - Scroll through all your transactions on the right

### Managing Transactions
- **Delete Single Transaction** - Click the ✕ button on any transaction
- **Clear All** - Click the "Clear All" button to remove all transactions (with confirmation)

### Categories Available
- 💼 **Salary** - Regular employment income
- 💻 **Freelance** - Project-based income
- 📈 **Investment** - Returns from investments
- 🍔 **Food** - Groceries, restaurants, dining
- 🚗 **Transport** - Gas, public transit, ride-sharing
- 🎬 **Entertainment** - Movies, games, subscriptions
- 🛍️ **Shopping** - Clothing, electronics, misc purchases
- 📄 **Bills** - Utilities, rent, insurance
- 📦 **Other** - Miscellaneous transactions

## 📁 Project Structure

```
new-demo-/
│
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Application logic and functionality
└── README.md           # Project documentation
```

### File Breakdown

**index.html** (Structure)
- Dashboard cards for balance, income, expenses
- Transaction form with inputs and radio buttons
- Canvas element for pie chart
- Transaction list container

**styles.css** (Styling)
- CSS variables for consistent theming
- Glassmorphism card effects
- Responsive grid layouts
- Smooth animations and transitions
- Custom scrollbar styling
- Media queries for mobile responsiveness

**script.js** (Logic)
- Transaction management (add, delete, clear)
- LocalStorage integration
- Real-time calculations
- DOM manipulation and rendering
- Custom pie chart drawing with Canvas API
- Event listeners and form handling

## ⚙️ How It Works

### Data Flow
1. **User Input** → Form submission captures transaction data
2. **Data Storage** → Transaction added to array and saved to localStorage
3. **Calculations** → Income and expenses totaled, balance calculated
4. **UI Update** → Dashboard, list, and chart re-rendered with new data

### LocalStorage Structure
```javascript
{
  "transactions": [
    {
      "id": 1234567890,
      "description": "Monthly Salary",
      "amount": 5000,
      "category": "salary",
      "type": "income",
      "date": "1/15/2024"
    }
  ]
}
```

### Chart Rendering
- Uses HTML5 Canvas API
- Calculates slice angles based on expense percentages
- Draws colored segments with labels
- Displays legend with category names
- Updates dynamically when transactions change

## 📸 Screenshots

### Dashboard View
The main dashboard shows your financial overview with balance, income, and expenses.

### Transaction Form
Easy-to-use form for adding new income or expense transactions.

### Expense Chart
Visual pie chart showing the breakdown of your spending by category.

### Transaction History
Scrollable list of all transactions with delete functionality.

## 🔮 Future Enhancements

Potential features for future versions:

- [ ] **Date Range Filtering** - View transactions by week, month, or custom range
- [ ] **Budget Goals** - Set spending limits for each category
- [ ] **Export Data** - Download transactions as CSV or PDF
- [ ] **Multiple Accounts** - Track different bank accounts or wallets
- [ ] **Recurring Transactions** - Auto-add monthly bills or salary
- [ ] **Dark/Light Mode Toggle** - User preference for theme
- [ ] **Search & Filter** - Find specific transactions quickly
- [ ] **Income Chart** - Separate visualization for income sources
- [ ] **Trends Analysis** - Monthly comparison and spending trends
- [ ] **Cloud Sync** - Save data across devices (requires backend)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and formatting
- Test your changes thoroughly
- Update documentation if needed
- Keep commits focused and descriptive

## 📄 License

This project is licensed under the MIT License - feel free to use, modify, and distribute as you wish.

```
MIT License

Copyright (c) 2024 Aryan Kanchan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📧 Contact

**Aryan Kanchan**

- GitHub: [@aryankanchan018](https://github.com/aryankanchan018)
- Project Link: [https://github.com/aryankanchan018/new-demo-](https://github.com/aryankanchan018/new-demo-)

---

## 🙏 Acknowledgments

- Inspired by modern fintech applications
- Built with passion for clean code and beautiful design
- Thanks to the open-source community for inspiration

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by Aryan Kanchan

</div>
