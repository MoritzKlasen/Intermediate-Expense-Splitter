# Expense Splitter

A professional, full-featured application for managing and splitting shared expenses among groups. Built with React 18 and Express.js, featuring a modern responsive UI with dark/light mode, analytics dashboard, and intelligent settlement calculations.

## ✨ Key Features

### Core Functionality
- **Participant Management** - Add and remove group members easily
- **Expense Tracking** - Record transactions with descriptions, amounts, categories, and dates
- **Smart Splitting** - Automatically divide expenses equally among participants
- **Real-time Calculations** - Instant balance updates and settlement suggestions
- **Settlement Recommendations** - Algorithm to determine optimal payment transfers

### User Interface
- **Dark/Light Mode** - Professional theme switching with persistence
- **Tab Navigation** - Organized into 4 intuitive sections (Overview, Expenses, Balances, Analytics)
- **Form Validation** - Real-time validation with clear error messages
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Toast Notifications** - Success and error feedback for all actions

### Analytics & Insights
- **Interactive Charts** - Pie chart (spending by person) and bar chart (spending by category)
- **Summary Statistics** - Key metrics including total expenses and participant counts
- **Expense Categories** - 8 predefined categories (Food, Transport, Accommodation, Entertainment, Shopping, Utilities, Medical, Other)
- **Detailed History** - Full expense log with delete capability

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- npm (v6+)

### Installation

```bash
# Navigate to project directory
cd Expense-Splitter

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the app:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📋 Usage

### Basic Workflow

1. **Add Participants**
   - Go to Overview tab
   - Enter participant name and click "Add Participant"

2. **Add Expenses**
   - Go to Expenses tab
   - Fill in expense details (description, amount, who paid, category, date, who it's split among)
   - Click "Add Expense"

3. **View Balances**
   - Go to Balances tab
   - See each person's balance (positive = owed money, negative = owes money)
   - Review settlement recommendations showing who should pay whom and how much

4. **Analyze Spending**
   - Go to Analytics tab
   - View charts showing spending patterns
   - Check summary statistics

5. **Switch Themes**
   - Click the theme toggle button (top-right)
   - Theme preference persists across sessions

## 🛠 Technology Stack

### Frontend
- **React 18.2.0** - Component-based UI framework
- **CSS Variables & Media Queries** - Dynamic theming and responsive design
- **Recharts 2.7** - Professional data visualization
- **Browser APIs** - Local Storage for theme persistence

### Backend
- **Express.js 4.18.2** - RESTful API server
- **Node.js** - JavaScript runtime environment
- **In-Memory Storage** - Session-based data storage

### Development
- **React Scripts 5.0.1** - Create React App build tools
- **Nodemon 3.0.1** - Development server with hot reload
- **Concurrently 8.2.1** - Run multiple processes concurrently

## 📁 Project Structure

```
Expense-Splitter/
├── server.js                    # Express API server & settlement logic
├── package.json                 # Dependencies & npm scripts
├── public/
│   ├── index.html               # React entry point
│   ├── manifest.json            # PWA manifest
│   └── favicon.ico              # App icon
├── src/
│   ├── App.js                   # Main component with layout
│   ├── index.js                 # React DOM mount point
│   ├── index.css                # Global styles with CSS variables
│   ├── App.css                  # Component styles
│   ├── components/
│   │   ├── TabNavigation.js              # Tab switching component
│   │   ├── TabNavigation.css             # Tab navigation styles
│   │   ├── ThemeToggle.js                # Light/dark mode toggle
│   │   ├── ThemeToggle.css               # Toggle button styles
│   │   ├── SummarySection.js             # Dashboard with statistics
│   │   ├── ParticipantSection.js         # Manage group members
│   │   ├── EnhancedExpenseForm.js        # Form for adding expenses
│   │   ├── EnhancedExpenseList.js        # List of expenses with delete
│   │   ├── BalanceSection.js             # Display balances per person
│   │   ├── SettlementSection.js          # Show payment recommendations
│   │   ├── AnalyticsSection.js           # Charts and visualizations
│   │   └── AnalyticsSection.css          # Analytics styles
│   ├── context/
│   │   └── ThemeContext.js               # Theme provider & hook
│   ├── hooks/
│   │   ├── useApi.js                     # API communication hooks
│   │   └── useLocalStorage.js            # Local storage hooks
│   ├── utils/
│   │   ├── calculations.js               # Balance & settlement math
│   │   ├── formatters.js                 # Date & currency formatting
│   │   └── validation.js                 # Input validation rules
│   ├── constants/
│   │   ├── categories.js                 # Expense category list
│   │   └── messages.js                   # User-facing text
│   └── index.css                         # Global styles
└── README.md                    # This file
```

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/data` | Fetch all participants and expenses |
| POST | `/api/participants` | Add a new participant |
| DELETE | `/api/participants/:name` | Remove a participant |
| POST | `/api/expenses` | Create a new expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| POST | `/api/clear` | Clear all expenses |
| GET | `/api/balances` | Calculate balances and settlements |

## 📦 Available Scripts

### `npm run dev`
Runs both backend and frontend in development mode
- React dev server on port 3000
- Express server on port 5000
- Hot reload enabled

### `npm run server`
Starts Express backend only (port 5000)

### `npm run client`
Starts React dev server only (port 3000)

### `npm run build`
Creates optimized production build

### `npm start`
Runs production build (requires `npm run build` first)

## 🎨 Customization

### Adding Expense Categories
Edit [src/constants/categories.js](src/constants/categories.js) to add or modify categories.

### Changing Color Scheme
Modify CSS variables in [src/index.css](src/index.css) under `:root` and `[data-theme="dark"]` sections.

### Adjusting Default Settings
Update constants in [src/constants/messages.js](src/constants/messages.js)

## 🧮 How Settlement Calculation Works

The app uses an efficient algorithm to minimize the number of transactions needed to settle debts:

1. Calculate each person's net balance (total paid - total owed)
2. Separate people into debtors (negative balance) and creditors (positive balance)
3. Match debtors with creditors to create settlement transactions
4. Minimize transaction count using a greedy algorithm

**Example**: If Alice paid $100 and Bob owes $80, Alice should receive $80 from Bob (not track individual expenses).

## 💾 Data Persistence

- Currently uses **in-memory storage** (data lost when server restarts)
- Theme preference saved in browser local storage
- Can be extended to use databases (MongoDB, PostgreSQL, etc.)

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Latest |
| Firefox | ✅ Latest |
| Safari | ✅ Latest |
| Edge | ✅ Latest |
| Mobile Chrome | ✅ Latest |
| Mobile Safari | ✅ Latest |

## 🔒 Security

- Input validation on all fields
- XSS protection through React's built-in escaping
- Error handling for invalid data
- No sensitive data exposure in UI

## 🚀 Future Enhancements

- **Database Integration** - Persist data with MongoDB or PostgreSQL
- **User Authentication** - Account creation and login
- **Multiple Groups** - Manage expenses for different trips/groups
- **Export Features** - Save expenses to CSV or PDF
- **Recurring Expenses** - Set up automatic recurring transactions
- **Budget Tracking** - Set and monitor budget limits
- **Email Notifications** - Send settlement reminders
- **Mobile App** - React Native version

## 📄 License

MIT License - Feel free to use for personal or educational projects

## 👤 Author

Created as a demonstration of modern React development practices and full-stack web development

---

**Version**: 3.0.0 (Professional Edition)  
**Last Updated**: March 1, 2026  
**Status**: Production Ready  

**Key Technologies**: React 18 | Express.js | Node.js | Recharts | CSS3
