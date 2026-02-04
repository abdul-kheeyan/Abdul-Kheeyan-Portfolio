// ---------------- ELEMENTS ----------------
const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const exportBtn = document.getElementById("exportPdfBtn");

const list = document.getElementById("expense-list");
const totalEl = document.getElementById("total");
const filterCategory = document.getElementById("filter-category");

// ---------------- DATA ----------------
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------------- CHART ----------------
let chart;

function updateChart(data) {
  const categoryTotals = {};

  data.forEach(e => {
    categoryTotals[e.category] =
      (categoryTotals[e.category] || 0) + e.amount;
  });

  const labels = Object.keys(categoryTotals);
  const values = Object.values(categoryTotals);

  if (chart) chart.destroy();

  const ctx = document.getElementById("expenseChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels,
      datasets: [{
        data: values
      }]
    }
  });
}

// ---------------- RENDER ----------------
function renderExpenses(data = expenses) {
  list.innerHTML = "";
  let total = 0;

  data.forEach((exp, index) => {
    total += exp.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${exp.title} - ₹${exp.amount} (${exp.category})</span>
      <span class="delete" onclick="deleteExpense(${index})">X</span>
    `;
    list.appendChild(li);
  });

  totalEl.innerText = total;

  // save only main expenses array
  localStorage.setItem("expenses", JSON.stringify(expenses));

  updateChart(data);
}

// ---------------- ADD ----------------
form.addEventListener("submit", e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = Number(amountInput.value);
  const category = categoryInput.value;

  if (!title || amount <= 0) return;

  expenses.push({
    title,
    amount,
    category,
    date: new Date().toISOString()
  });

  renderExpenses();
  form.reset();
});

// ---------------- DELETE ----------------
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// ---------------- FILTER ----------------
filterCategory.addEventListener("change", () => {
  const value = filterCategory.value;

  if (value === "all") {
    renderExpenses(expenses);
  } else {
    const filtered = expenses.filter(e => e.category === value);
    renderExpenses(filtered);
  }
});

// ---------------- EXPORT TO PDF ----------------
exportBtn.addEventListener("click", () => {
  if (expenses.length === 0) {
    alert("No expenses to export!");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Expense Report", 14, 15);

  doc.setFontSize(11);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

  // -------- GROUP EXPENSES BY CATEGORY --------
  const grouped = {};

  expenses.forEach(e => {
    if (!grouped[e.category]) {
      grouped[e.category] = [];
    }
    grouped[e.category].push(e);
  });

  let startY = 30;

  // -------- CREATE PDF STRUCTURE --------
  for (let category in grouped) {

    doc.setFontSize(14);
    doc.text(`Category: ${category}`, 14, startY);
    startY += 5;

    const tableData = grouped[category].map((e, i) => [
      i + 1,
      e.title,
      `₹${e.amount}`,
      new Date(e.date).toLocaleDateString()
    ]);

    doc.autoTable({
      startY,
      head: [["#", "Title", "Amount", "Date"]],
      body: tableData,
      theme: "grid",
      styles: { fontSize: 10 }
    });

    startY = doc.lastAutoTable.finalY + 10;
  }

  doc.save("expense-report.pdf");
});

// ---------------- INIT ----------------
renderExpenses();
