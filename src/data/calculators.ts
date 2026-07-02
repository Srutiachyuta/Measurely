import type { CalculatorDefinition, CalculatorResult } from "@/types/calculators";
import {
  Calculator,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Receipt,
  Landmark,
  Percent,
  Heart,
  ArrowLeftRight,
  Flame,
  Droplets,
  Baby,
  Activity,
  Scale,
  Ruler,
  Divide,
  Grid3x3,
  FileX,
  Ship,
  Hash,
  BarChart3,
  Clock,
  CalendarDays,
  Timer,
  GraduationCap,
  Zap,
  CircuitBoard,
  Hammer,
  PaintBucket,
  House,
  Tag,
  HandCoins,
  Car,
  Award,
  BookOpen,
  Kanban,
  Gauge,
  LayoutGrid,
  Wallet,
  ChartLine,
  Banknote,
  Bot,
} from "lucide-react";


export const calculators: CalculatorDefinition[] = [
  {
    icon: TrendingUp,
    name: "EMI Calculator",
    slug: "emi-calculator",
    category: "finance",
    description: "Calculate your monthly EMI, total interest payable, and total payment for any loan amount.",
    metaTitle: "EMI Calculator | Calculate Loan EMI, Interest & Total Payment",
    metaDescription: "Free online EMI calculator to calculate monthly installments, total interest, and payment schedule.",
    inputs: [
      { label: "Loan Amount", key: "loanAmount", type: "number", placeholder: "e.g., 500000", min: 1, step: 1000, defaultValue: 500000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 8.5", min: 0, max: 100, step: 0.1, defaultValue: 8.5 },
      { label: "Tenure", key: "tenure", type: "number", placeholder: "e.g., 5", min: 1, max: 50, defaultValue: 5 },
      { label: "Tenure Type", key: "tenureType", type: "select", options: [{ label: "Years", value: "years" }, { label: "Months", value: "months" }], defaultValue: "years" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.loanAmount);
      const R = Number(inputs.interestRate);
      const tenure = Number(inputs.tenure);
      const N = inputs.tenureType === "years" ? tenure * 12 : tenure;
      const monthlyRate = R / 12 / 100;
      const emi = P * monthlyRate * Math.pow(1 + monthlyRate, N) / (Math.pow(1 + monthlyRate, N) - 1);
      const totalPayment = emi * N;
      const totalInterest = totalPayment - P;
      return [
        { label: "Monthly EMI", key: "emi", value: Math.round(emi * 100) / 100, unit: "₹", color: "green" },
        { label: "Total Interest", key: "totalInterest", value: Math.round(totalInterest * 100) / 100, unit: "₹", color: "red" },
        { label: "Total Payment", key: "totalPayment", value: Math.round(totalPayment * 100) / 100, unit: "₹", color: "blue" },
      ];
    },
    chart: (results) => {
      const principal = results.find(r => r.key === "totalPayment")?.value as number || 0;
      const interest = results.find(r => r.key === "totalInterest")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal", "Total Interest"],
          datasets: [{
            data: [principal - interest, interest],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { loanAmount: 500000, interestRate: 8.5, tenure: 5, tenureType: "years" }, results: [] },
    faqs: [
      { question: "What is EMI?", answer: "EMI stands for Equated Monthly Installment. It is the fixed monthly payment you make to repay a loan, which includes both principal and interest components." },
      { question: "How is EMI calculated?", answer: "EMI is calculated using the formula: EMI = P x r x (1+r)^n / ((1+r)^n - 1), where P is the loan amount, r is the monthly interest rate, and n is the number of monthly installments." },
      { question: "Can prepayment reduce my EMI?", answer: "Yes, making prepayments reduces the outstanding principal, which can either reduce your EMI amount or shorten the loan tenure, depending on your lenders terms." },
      { question: "What factors affect my EMI amount?", answer: "Your EMI depends on the loan amount, interest rate, and tenure. Higher loan amounts and interest rates increase EMI, while longer tenure reduces it." },
      { question: "Is it better to have a longer or shorter loan tenure?", answer: "Shorter tenure means higher EMI but less total interest paid. Longer tenure reduces monthly burden but increases total interest cost." },
      { question: "Can I change my loan tenure after taking a loan?", answer: "Many lenders allow tenure modification through restructuring. However, this may involve fees and renegotiation of terms." },
      { question: "What happens if I miss an EMI payment?", answer: "Missing EMIs can result in late fees, a lowered credit score, and potential legal action by the lender for prolonged default." },
      { question: "Does the EMI amount change if interest rates fluctuate?", answer: "For fixed-rate loans, EMI remains constant. For floating-rate loans, EMIs may change when the lender revises the interest rate." },
    ],
    relatedSlugs: ["loan-calculator", "mortgage-calculator", "compound-interest-calculator", "sip-calculator"],
    formula: "EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)",
  },
  {
    icon: ArrowLeftRight,
    name: "Loan Calculator",
    slug: "loan-calculator",
    category: "finance",
    description: "Calculate monthly payments, total interest, and total cost for any loan.",
    metaTitle: "Loan Calculator | Free Online Loan Payment Calculator",
    metaDescription: "Use our free loan calculator to estimate monthly payments, total interest, and total loan cost.",
    inputs: [
      { label: "Loan Amount", key: "loanAmount", type: "number", placeholder: "e.g., 500000", min: 1, step: 1000, defaultValue: 500000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 7.5", min: 0, max: 100, step: 0.1, defaultValue: 7.5 },
      { label: "Loan Term", key: "loanTerm", type: "number", placeholder: "e.g., 5", min: 1, max: 50, defaultValue: 5 },
      { label: "Term Type", key: "termType", type: "select", options: [{ label: "Years", value: "years" }, { label: "Months", value: "months" }], defaultValue: "years" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.loanAmount);
      const R = Number(inputs.interestRate);
      const term = Number(inputs.loanTerm);
      const N = inputs.termType === "years" ? term * 12 : term;
      const monthlyRate = R / 12 / 100;
      const monthly = P * monthlyRate * Math.pow(1 + monthlyRate, N) / (Math.pow(1 + monthlyRate, N) - 1);
      const total = monthly * N;
      const interest = total - P;
      return [
        { label: "Monthly Payment", key: "monthlyPayment", value: Math.round(monthly * 100) / 100, unit: "₹", color: "green" },
        { label: "Total Interest", key: "totalInterest", value: Math.round(interest * 100) / 100, unit: "₹", color: "red" },
        { label: "Total Payment", key: "totalPayment", value: Math.round(total * 100) / 100, unit: "₹", color: "blue" },
        { label: "Number of Payments", key: "numPayments", value: N, color: "default" },
      ];
    },
    chart: (results) => {
      const principal = results.find(r => r.key === "totalPayment")?.value as number || 0;
      const interest = results.find(r => r.key === "totalInterest")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Total Interest", "Principal"],
          datasets: [{
            data: [interest, principal - interest],
            backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(99, 102, 241, 0.8)"],
            borderColor: ["rgba(239, 68, 68, 1)", "rgba(99, 102, 241, 1)"],
            borderWidth: 2,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        },
      };
    },
    example: { inputs: { loanAmount: 500000, interestRate: 7.5, loanTerm: 5, termType: "years" }, results: [] },
    faqs: [
      { question: "What types of loans can I calculate?", answer: "This calculator works for any fixed-rate loan including personal loans, car loans, student loans, and home loans." },
      { question: "What is an amortization schedule?", answer: "An amortization schedule shows each payments breakdown between principal and interest over the loan term." },
      { question: "How does the interest rate affect my payments?", answer: "Higher interest rates increase your monthly payment and total interest cost." },
      { question: "What is the difference between secured and unsecured loans?", answer: "Secured loans require collateral like property or a vehicle and typically have lower interest rates. Unsecured loans do not require collateral but have higher rates." },
      { question: "How does my credit score affect loan approval?", answer: "A higher credit score improves your chances of approval and helps secure lower interest rates. Most lenders prefer scores above 700." },
      { question: "Can I pay off my loan early without penalty?", answer: "Some loans have prepayment penalties. Check your loan agreement or ask your lender about any fees for early repayment." },
      { question: "What is the total cost of a loan?", answer: "The total cost includes the principal amount plus all interest and fees paid over the full loan term." },
      { question: "How do loan term and monthly payment relate?", answer: "Longer terms mean lower monthly payments but more total interest. Shorter terms mean higher payments but less interest overall." },
    ],
    relatedSlugs: ["emi-calculator", "mortgage-calculator", "compound-interest-calculator", "home-equity-loan-calculator"],
  },
  {
    icon: Landmark,
    name: "Mortgage Calculator",
    slug: "mortgage-calculator",
    category: "finance",
    description: "Calculate monthly mortgage payments, including property tax and insurance estimates.",
    metaTitle: "Mortgage Calculator | Free Home Loan Payment Calculator",
    metaDescription: "Estimate your monthly mortgage payments including principal, interest, taxes, and insurance.",
    inputs: [
      { label: "Home Price", key: "homePrice", type: "number", placeholder: "e.g., 350000", min: 1, step: 10000, defaultValue: 350000 },
      { label: "Down Payment", key: "downPayment", type: "number", placeholder: "e.g., 70000", min: 0, step: 1000, defaultValue: 70000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 6.5", min: 0, max: 100, step: 0.1, defaultValue: 6.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 30", min: 1, max: 50, defaultValue: 30 },
      { label: "Annual Property Tax", key: "propertyTax", type: "number", placeholder: "e.g., 3600", min: 0, step: 100, defaultValue: 3600 },
      { label: "Annual Insurance", key: "insurance", type: "number", placeholder: "e.g., 1200", min: 0, step: 50, defaultValue: 1200 },
    ],
    compute: (inputs) => {
      const price = Number(inputs.homePrice);
      const down = Number(inputs.downPayment);
      const P = price - down;
      const R = Number(inputs.interestRate);
      const years = Number(inputs.loanTerm);
      const N = years * 12;
      const monthlyRate = R / 12 / 100;
      const pi = P * monthlyRate * Math.pow(1 + monthlyRate, N) / (Math.pow(1 + monthlyRate, N) - 1);
      const taxMonthly = Number(inputs.propertyTax) / 12;
      const insuranceMonthly = Number(inputs.insurance) / 12;
      const totalMonthly = pi + taxMonthly + insuranceMonthly;
      return [
        { label: "Principal & Interest", key: "principalInterest", value: Math.round(pi * 100) / 100, unit: "₹/mo", color: "blue" },
        { label: "Property Tax", key: "propertyTaxMonth", value: Math.round(taxMonthly * 100) / 100, unit: "₹/mo", color: "amber" },
        { label: "Insurance", key: "insuranceMonth", value: Math.round(insuranceMonthly * 100) / 100, unit: "₹/mo", color: "amber" },
        { label: "Total Monthly", key: "totalMonthly", value: Math.round(totalMonthly * 100) / 100, unit: "₹/mo", color: "green" },
        { label: "Loan Amount", key: "loanAmount", value: Math.round(P * 100) / 100, unit: "₹", color: "default" },
        { label: "Down Payment %", key: "downPercent", value: Math.round(down / price * 100 * 100) / 100, unit: "%", color: "default" },
      ];
    },
    chart: (results) => {
      const pi = results.find(r => r.key === "principalInterest")?.value as number || 0;
      const tax = results.find(r => r.key === "propertyTaxMonth")?.value as number || 0;
      const ins = results.find(r => r.key === "insuranceMonth")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal & Interest", "Property Tax", "Insurance"],
          datasets: [{ data: [pi, tax, ins], backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"], borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"], borderWidth: 2 }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { homePrice: 350000, downPayment: 70000, interestRate: 6.5, loanTerm: 30, propertyTax: 3600, insurance: 1200 }, results: [] },
    faqs: [
      { question: "What is PMI?", answer: "Private Mortgage Insurance (PMI) is typically required when the down payment is less than 20% of the home price." },
      { question: "Should I make a larger down payment?", answer: "A larger down payment reduces your loan amount and monthly payment, and helps avoid PMI." },
      { question: "What are closing costs?", answer: "Closing costs are fees paid at the end of a real estate transaction, typically 2-5% of the home price, including appraisal, title insurance, and origination fees." },
      { question: "What is the difference between fixed-rate and adjustable-rate mortgages?", answer: "Fixed-rate mortgages have a constant interest rate for the entire term. Adjustable-rate mortgages (ARMs) have rates that change periodically based on market conditions." },
      { question: "How does property tax affect my monthly payment?", answer: "Property tax is typically escrowed by the lender and paid on your behalf. It adds to your monthly payment and varies by location." },
      { question: "What is the ideal debt-to-income ratio for a mortgage?", answer: "Lenders typically prefer a debt-to-income ratio below 43%. Keep your total monthly debts including the mortgage under this threshold." },
      { question: "Can I refinance my mortgage to get a lower rate?", answer: "Yes, refinancing replaces your existing mortgage with a new one at a lower rate, potentially reducing monthly payments or shortening the term." },
      { question: "How does homeowners insurance factor into costs?", answer: "Lenders require homeowners insurance to protect their investment. It covers damage from fire, storms, theft, and liability, and is typically paid monthly through escrow." },
    ],
    relatedSlugs: ["emi-calculator", "loan-calculator", "compound-interest-calculator", "home-equity-loan-calculator"],
  },
  {
    icon: Percent,
    name: "Interest Calculator",
    slug: "interest-calculator",
    category: "finance",
    description: "Calculate simple interest and total amount for any principal, rate, and time period.",
    metaTitle: "Simple Interest Calculator | Calculate Interest Online",
    metaDescription: "Free simple interest calculator. Calculate interest earned or payable on any principal amount.",
    inputs: [
      { label: "Principal Amount", key: "principal", type: "number", placeholder: "e.g., 10000", min: 1, defaultValue: 10000 },
      { label: "Interest Rate (% p.a.)", key: "rate", type: "number", placeholder: "e.g., 5", min: 0, max: 100, step: 0.1, defaultValue: 5 },
      { label: "Time Period (Years)", key: "time", type: "number", placeholder: "e.g., 3", min: 0.1, max: 100, step: 0.5, defaultValue: 3 },
    ],
    compute: (inputs) => {
      const P = Number(inputs.principal);
      const R = Number(inputs.rate);
      const T = Number(inputs.time);
      const interest = P * R * T / 100;
      const total = P + interest;
      return [
        { label: "Simple Interest", key: "interest", value: Math.round(interest * 100) / 100, unit: "₹", color: "green" },
        { label: "Total Amount", key: "total", value: Math.round(total * 100) / 100, unit: "₹", color: "blue" },
      ];
    },
    chart: (results) => {
      const P = results.find(r => r.key === "total")?.value as number || 0;
      const interest = results.find(r => r.key === "interest")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal", "Interest"],
          datasets: [{
            data: [P - interest, interest],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { principal: 10000, rate: 5, time: 3 }, results: [] },
    faqs: [
      { question: "What is simple interest?", answer: "Simple interest is calculated only on the original principal amount, without considering accumulated interest from previous periods." },
      { question: "How is simple interest different from compound interest?", answer: "Simple interest is calculated only on the principal. Compound interest is calculated on the principal plus accumulated interest." },
      { question: "Where is simple interest commonly used?", answer: "Simple interest is often used for short-term loans, car loans, personal loans, and some savings accounts or bonds." },
      { question: "How does the time period affect simple interest?", answer: "Longer time periods result in more total interest since simple interest is directly proportional to time. Even a small rate adds up over many years." },
      { question: "Can simple interest be calculated for partial years?", answer: "Yes, simply use the fraction of the year in decimal form. For example, 6 months equals 0.5 years in the formula." },
      { question: "What is the formula for simple interest?", answer: "Simple Interest = P x R x T / 100, where P is principal, R is annual interest rate, and T is time in years." },
      { question: "Is simple interest better for borrowers or lenders?", answer: "Simple interest generally favors borrowers since interest does not compound. Lenders earn less compared to compound interest over long periods." },
      { question: "How do I calculate the total amount repayable?", answer: "Add the simple interest to the principal amount. Total = Principal + Simple Interest." },
    ],
    relatedSlugs: ["compound-interest-calculator", "emi-calculator", "loan-calculator"],
    formula: "Simple Interest = P × r × t",
  },
  {
    icon: TrendingUp,
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "finance",
    description: "Calculate compound interest with different compounding frequencies.",
    metaTitle: "Compound Interest Calculator | Free Online Calculator",
    metaDescription: "See how your money grows with compound interest. Calculate future value with daily, monthly, quarterly, or yearly compounding.",
    inputs: [
      { label: "Principal Amount", key: "principal", type: "number", placeholder: "e.g., 10000", min: 1, defaultValue: 10000 },
      { label: "Interest Rate (% p.a.)", key: "rate", type: "number", placeholder: "e.g., 8", min: 0, max: 100, step: 0.1, defaultValue: 8 },
      { label: "Time (Years)", key: "time", type: "number", placeholder: "e.g., 10", min: 0.1, max: 100, step: 0.5, defaultValue: 10 },
      { label: "Compounding Frequency", key: "frequency", type: "select", options: [
        { label: "Yearly", value: "1" }, { label: "Half-Yearly", value: "2" },
        { label: "Quarterly", value: "4" }, { label: "Monthly", value: "12" }, { label: "Daily", value: "365" },
      ], defaultValue: "12" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.principal);
      const R = Number(inputs.rate);
      const T = Number(inputs.time);
      const n = Number(inputs.frequency);
      const rate = R / 100;
      const total = P * Math.pow(1 + rate / n, n * T);
      const interest = total - P;
      return [
        { label: "Maturity Amount", key: "maturityAmount", value: Math.round(total * 100) / 100, unit: "₹", color: "green" },
        { label: "Total Interest", key: "totalInterest", value: Math.round(interest * 100) / 100, unit: "₹", color: "blue" },
        { label: "Effective Rate", key: "effectiveRate", value: Math.round((Math.pow(1 + rate / n, n) - 1) * 10000) / 100, unit: "%", color: "default" },
      ];
    },
    chart: (results) => {
      const P = results.find(r => r.key === "maturityAmount")?.value as number || 0;
      const interest = results.find(r => r.key === "totalInterest")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal", "Interest"],
          datasets: [{
            data: [P - interest, interest],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { principal: 10000, rate: 8, time: 10, frequency: "12" }, results: [] },
    faqs: [
      { question: "What is compound interest?", answer: "Compound interest is interest on interest. It makes your money grow faster because you earn returns on your returns." },
      { question: "What is the Rule of 72?", answer: "Divide 72 by your annual interest rate to estimate how many years it takes to double your money." },
      { question: "How does compounding frequency affect growth?", answer: "More frequent compounding (daily vs yearly) results in higher returns because interest is calculated on accumulated interest more often." },
      { question: "What is the difference between APY and APR?", answer: "APY (Annual Percentage Yield) includes compounding effects, while APR (Annual Percentage Rate) is the simple stated rate. APY is always higher than APR." },
      { question: "How does time affect compound interest growth?", answer: "Time is the most powerful factor in compounding. The longer your money compounds, the more dramatic the growth due to the exponential nature of the formula." },
      { question: "What is the formula for compound interest?", answer: "A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is annual rate, n is compounding frequency, and t is time in years." },
      { question: "Can compound interest work against me?", answer: "Yes, credit cards and loans with compound interest can cause your debt to grow rapidly if you only make minimum payments." },
      { question: "What is continuous compounding?", answer: "Continuous compounding assumes interest is calculated and added at every possible instant. It uses the formula A = P x e^(rt) and yields the maximum possible returns." },
    ],
    relatedSlugs: ["interest-calculator", "sip-calculator", "fd-calculator"],
    formula: "A = P × (1 + r/n)^(n × t)",
  },
  {
    icon: PiggyBank,
    name: "SIP Calculator",
    slug: "sip-calculator",
    category: "finance",
    description: "Plan your investments with our SIP calculator showing future value of monthly investments.",
    metaTitle: "SIP Calculator | Systematic Investment Plan Calculator Online",
    metaDescription: "Free online SIP calculator to estimate the future value of your monthly investments with accurate return calculations.",
    inputs: [
      { label: "Monthly Investment", key: "monthlyInvestment", type: "number", placeholder: "e.g., 5000", min: 100, step: 100, defaultValue: 5000 },
      { label: "Expected Return (% p.a.)", key: "expectedReturn", type: "number", placeholder: "e.g., 12", min: 0, max: 100, step: 0.5, defaultValue: 12 },
      { label: "Investment Period", key: "tenure", type: "number", placeholder: "e.g., 10", min: 1, max: 50, defaultValue: 10 },
      { label: "Period Type", key: "tenureType", type: "select", options: [{ label: "Years", value: "years" }, { label: "Months", value: "months" }], defaultValue: "years" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.monthlyInvestment);
      const R = Number(inputs.expectedReturn);
      const tenure = Number(inputs.tenure);
      const n = inputs.tenureType === "years" ? tenure * 12 : tenure;
      const monthlyRate = R / 12 / 100;
      const maturity = P * (Math.pow(1 + monthlyRate, n) - 1) / monthlyRate * (1 + monthlyRate);
      const invested = P * n;
      const returns = maturity - invested;
      return [
        { label: "Invested Amount", key: "investedAmount", value: Math.round(invested * 100) / 100, unit: "₹", color: "blue" },
        { label: "Estimated Returns", key: "estimatedReturns", value: Math.round(returns * 100) / 100, unit: "₹", color: "green" },
        { label: "Maturity Value", key: "maturityValue", value: Math.round(maturity * 100) / 100, unit: "₹", color: "green" },
      ];
    },
    chart: (results) => {
      const invested = results.find(r => r.key === "investedAmount")?.value as number || 0;
      const returns = results.find(r => r.key === "estimatedReturns")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Invested Amount", "Estimated Returns"],
          datasets: [{
            data: [invested, returns],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { monthlyInvestment: 5000, expectedReturn: 12, tenure: 10, tenureType: "years" }, results: [] },
    faqs: [
      { question: "What is SIP?", answer: "A Systematic Investment Plan lets you invest a fixed amount regularly in mutual funds, usually monthly." },
      { question: "How does rupee cost averaging work?", answer: "You buy more units when prices are low and fewer when high, potentially lowering your average cost over time." },
      { question: "Is SIP better than a lump sum?", answer: "SIP reduces market timing risk. Lump sum may be better if markets are undervalued and you have a large amount." },
      { question: "What is the ideal SIP tenure?", answer: "Most experts recommend a minimum tenure of 5-7 years for equity SIPs to benefit from compounding and ride out market volatility." },
      { question: "Can I start a SIP with a small amount?", answer: "Yes, many mutual funds allow SIPs starting as low as ₹500 per month, making it accessible for beginners." },
      { question: "What happens if I miss a SIP payment?", answer: "Most fund houses allow a grace period. Missing payments may result in the SIP being paused or terminated after repeated failures." },
      { question: "How are SIP returns calculated?", answer: "SIP returns are typically measured using XIRR (Extended Internal Rate of Return), which accounts for irregular cash flows over time." },
      { question: "Can I increase or decrease my SIP amount?", answer: "Yes, most fund houses allow you to modify your SIP amount or frequency. Some also offer top-up SIP facilities for periodic increases." },
    ],
    relatedSlugs: ["swp-calculator", "compound-interest-calculator", "fd-calculator"],
    formula: "FV = P × ((1 + r)^n − 1) / r × (1 + r)",
  },
  {
    icon: Receipt,
    name: "SWP Calculator",
    slug: "swp-calculator",
    category: "finance",
    description: "Plan systematic withdrawals and see how long your investment lasts.",
    metaTitle: "SWP Calculator | Systematic Withdrawal Plan Calculator",
    metaDescription: "Free SWP calculator to plan retirement withdrawals. Calculate how much you can withdraw monthly and how long your corpus will last.",
    inputs: [
      { label: "Total Investment", key: "totalInvestment", type: "number", placeholder: "e.g., 1000000", min: 1, step: 10000, defaultValue: 1000000 },
      { label: "Monthly Withdrawal", key: "withdrawalAmount", type: "number", placeholder: "e.g., 10000", min: 1, step: 1000, defaultValue: 10000 },
      { label: "Expected Return (% p.a.)", key: "expectedReturn", type: "number", placeholder: "e.g., 8", min: 0, max: 100, step: 0.5, defaultValue: 8 },
      { label: "Withdrawal Period (Years)", key: "tenure", type: "number", placeholder: "e.g., 20", min: 1, max: 100, defaultValue: 20 },
    ],
    compute: (inputs) => {
      const total = Number(inputs.totalInvestment);
      const withdrawal = Number(inputs.withdrawalAmount);
      const R = Number(inputs.expectedReturn);
      const years = Number(inputs.tenure);
      const months = years * 12;
      const monthlyRate = R / 12 / 100;
      let balance = total;
      let totalWithdrawn = 0;
      for (let i = 0; i < months; i++) {
        balance = balance * (1 + monthlyRate) - withdrawal;
        totalWithdrawn += withdrawal;
        if (balance <= 0) break;
      }
      if (balance < 0) balance = 0;
      const returns = totalWithdrawn + balance - total;
      return [
        { label: "Total Withdrawn", key: "totalWithdrawn", value: Math.round(totalWithdrawn * 100) / 100, unit: "₹", color: "blue" },
        { label: "Remaining Balance", key: "remainingBalance", value: Math.round(balance * 100) / 100, unit: "₹", color: balance > 0 ? "green" : "red" },
        { label: "Total Returns Earned", key: "totalReturns", value: Math.round(returns * 100) / 100, unit: "₹", color: "green" },
      ];
    },
    chart: (results) => {
      const total = results.find(r => r.key === "totalWithdrawn")?.value as number || 0;
      const balance = results.find(r => r.key === "remainingBalance")?.value as number || 0;
      const returns = results.find(r => r.key === "totalReturns")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Total Withdrawn", "Remaining Balance", "Total Returns"],
          datasets: [{
            data: [total, balance, returns],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { totalInvestment: 1000000, withdrawalAmount: 10000, expectedReturn: 8, tenure: 20 }, results: [] },
    faqs: [
      { question: "What is SWP?", answer: "A Systematic Withdrawal Plan lets you withdraw a fixed amount from your investment at regular intervals." },
      { question: "Is SWP good for retirement?", answer: "Yes, SWP is commonly used during retirement to generate a regular income stream from accumulated savings." },
      { question: "How does an SWP differ from dividends?", answer: "SWP involves selling units of your investment to generate cash flow, while dividends are profit distributions from the fund, which are not guaranteed." },
      { question: "What happens if my investment returns are lower than expected?", answer: "If returns fall below your withdrawal rate, your capital will deplete faster, potentially running out before the planned period ends." },
      { question: "Can I change my SWP withdrawal amount?", answer: "Yes, most fund houses allow you to modify the withdrawal amount or frequency at any time, giving you flexibility to adjust to changing needs." },
      { question: "Is SWP taxable?", answer: "Yes, SWP withdrawals are subject to capital gains tax. The tax rate depends on the type of fund and holding period." },
      { question: "What is a safe withdrawal rate for SWP?", answer: "A commonly recommended safe withdrawal rate is 4-6% annually, which aims to preserve the corpus while providing regular income." },
      { question: "Can I start an SWP and SIP together?", answer: "Yes, you can simultaneously run an SIP to accumulate wealth and an SWP to withdraw, but ensure the withdrawals do not exceed returns." },
    ],
    relatedSlugs: ["sip-calculator", "compound-interest-calculator", "fd-calculator"],
  },
  {
    icon: Landmark,
    name: "FD Calculator",
    slug: "fd-calculator",
    category: "finance",
    description: "Calculate fixed deposit maturity amount and interest earned for any tenure.",
    metaTitle: "FD Calculator | Fixed Deposit Calculator Online",
    metaDescription: "Free FD calculator to calculate maturity amount and interest earned on fixed deposits. Compare different compounding frequencies.",
    inputs: [
      { label: "Deposit Amount", key: "principal", type: "number", placeholder: "e.g., 100000", min: 1, step: 1000, defaultValue: 100000 },
      { label: "Interest Rate (% p.a.)", key: "rate", type: "number", placeholder: "e.g., 7", min: 0, max: 100, step: 0.1, defaultValue: 7 },
      { label: "Tenure (Years)", key: "tenure", type: "number", placeholder: "e.g., 5", min: 0.1, max: 50, step: 0.5, defaultValue: 5 },
      { label: "Compounding", key: "compounding", type: "select", options: [
        { label: "Yearly", value: "yearly" }, { label: "Half-Yearly", value: "half_yearly" },
        { label: "Quarterly", value: "quarterly" }, { label: "Monthly", value: "monthly" },
      ], defaultValue: "yearly" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.principal);
      const R = Number(inputs.rate);
      const T = Number(inputs.tenure);
      const freqMap: Record<string, number> = { yearly: 1, half_yearly: 2, quarterly: 4, monthly: 12 };
      const n = freqMap[inputs.compounding as string] ?? 1;
      const amount = P * Math.pow(1 + R / 100 / n, n * T);
      return [
        { label: "Maturity Amount", key: "maturityAmount", value: Math.round(amount * 100) / 100, unit: "₹", color: "green" },
        { label: "Interest Earned", key: "interestEarned", value: Math.round((amount - P) * 100) / 100, unit: "₹", color: "blue" },
        { label: "Effective Yield", key: "effectiveYield", value: Math.round((Math.pow(1 + R / 100 / n, n) - 1) * 10000) / 100, unit: "%", color: "default" },
      ];
    },
    chart: (results) => {
      const P = results.find(r => r.key === "maturityAmount")?.value as number || 0;
      const interest = results.find(r => r.key === "interestEarned")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal", "Interest Earned"],
          datasets: [{
            data: [P - interest, interest],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { principal: 100000, rate: 7, tenure: 5, compounding: "yearly" }, results: [] },
    faqs: [
      { question: "What is a Fixed Deposit?", answer: "A Fixed Deposit (FD) is a financial instrument where you deposit money for a fixed period at a predetermined interest rate." },
      { question: "Is FD interest taxable?", answer: "Yes, interest earned on FDs is taxable as per your income tax slab." },
      { question: "Can I withdraw my FD before maturity?", answer: "Yes, but early withdrawal typically incurs a penalty of 0.5-1% and the interest rate may be reduced to that of a lower tenure." },
      { question: "How does compounding frequency affect FD returns?", answer: "More frequent compounding (quarterly or monthly) results in higher effective returns compared to yearly compounding." },
      { question: "What is the minimum deposit for an FD?", answer: "Most banks offer FDs starting from as low as ₹1,000, though minimum amounts vary between financial institutions." },
      { question: "Are senior citizens offered better FD rates?", answer: "Yes, most banks offer an additional 0.25-0.75% interest rate to senior citizens on fixed deposits." },
      { question: "What is a tax-saving FD?", answer: "Tax-saving FDs have a 5-year lock-in period and qualify for deduction under Section 80C of the Income Tax Act up to ₹1.5 lakh." },
      { question: "How is FD interest paid out?", answer: "Interest can be paid monthly, quarterly, half-yearly, or at maturity, depending on your chosen payout option." },
    ],
    relatedSlugs: ["rd-calculator", "compound-interest-calculator", "sip-calculator"],
    formula: "M = P × (1 + r/n)^(n × t)",
  },
  {
    icon: PiggyBank,
    name: "RD Calculator",
    slug: "rd-calculator",
    category: "finance",
    description: "Calculate recurring deposit maturity amount with monthly investments.",
    metaTitle: "RD Calculator | Recurring Deposit Calculator Online",
    metaDescription: "Free RD calculator to estimate maturity amount for your recurring deposits. Plan your savings with accurate calculations.",
    inputs: [
      { label: "Monthly Deposit", key: "monthlyDeposit", type: "number", placeholder: "e.g., 5000", min: 100, step: 100, defaultValue: 5000 },
      { label: "Interest Rate (% p.a.)", key: "rate", type: "number", placeholder: "e.g., 6.5", min: 0, max: 100, step: 0.1, defaultValue: 6.5 },
      { label: "Tenure (Years)", key: "tenure", type: "number", placeholder: "e.g., 5", min: 1, max: 50, defaultValue: 5 },
    ],
    compute: (inputs) => {
      const R = Number(inputs.monthlyDeposit);
      const rate = Number(inputs.rate);
      const years = Number(inputs.tenure);
      const n = years * 12;
      const monthlyRate = rate / 12 / 100;
      const maturity = R * (Math.pow(1 + monthlyRate, n) - 1) / (1 - Math.pow(1 + monthlyRate, -1 / 3));
      const invested = R * n;
      return [
        { label: "Maturity Amount", key: "maturityAmount", value: Math.round(maturity * 100) / 100, unit: "₹", color: "green" },
        { label: "Total Invested", key: "totalInvested", value: Math.round(invested * 100) / 100, unit: "₹", color: "blue" },
        { label: "Interest Earned", key: "interestEarned", value: Math.round((maturity - invested) * 100) / 100, unit: "₹", color: "green" },
      ];
    },
    chart: (results) => {
      const invested = results.find(r => r.key === "totalInvested")?.value as number || 0;
      const interest = results.find(r => r.key === "interestEarned")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Total Invested", "Interest Earned"],
          datasets: [{
            data: [invested, interest],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { monthlyDeposit: 5000, rate: 6.5, tenure: 5 }, results: [] },
    faqs: [
      { question: "What is a Recurring Deposit?", answer: "A Recurring Deposit (RD) is a savings scheme where you deposit a fixed amount every month and earn interest." },
      { question: "Is RD better than FD?", answer: "RD is for building a savings habit with monthly deposits. FD is for lump sum investments." },
      { question: "What is the minimum monthly deposit for an RD?", answer: "Most banks allow RD accounts with monthly deposits as low as ₹100 to ₹500, making it very accessible." },
      { question: "Can I skip a month of RD payment?", answer: "Most banks allow a grace period but may charge a penalty for missed deposits. Some accounts default if payments are skipped repeatedly." },
      { question: "How is RD interest calculated?", answer: "RD interest is compounded quarterly for most banks. The formula considers the monthly deposit, interest rate, and tenure to compute the maturity amount." },
      { question: "Can I close an RD account prematurely?", answer: "Yes, but early closure typically incurs a penalty and you may receive interest at a lower rate." },
      { question: "Is RD interest taxable?", answer: "Yes, interest earned on RD accounts is taxable as per your income tax slab, similar to FD interest." },
      { question: "What is the maximum tenure for an RD?", answer: "RD tenures typically range from 6 months to 10 years, with most accounts offering terms between 1 and 5 years." },
    ],
    relatedSlugs: ["fd-calculator", "sip-calculator", "compound-interest-calculator"],
  },
  {
    icon: Percent,
    name: "GST Calculator",
    slug: "gst-calculator",
    category: "finance",
    description: "Calculate GST/HST inclusive and exclusive prices. Supports India GST slabs and Ontario HST with GST/PST breakdown.",
    metaTitle: "GST & HST Calculator | Free Online GST/HST Calculator",
    metaDescription: "Free online GST/HST calculator for India (5%, 12%, 18%, 28%) and Ontario HST (13% with GST/PST breakdown). Add or remove tax from any amount.",
    inputs: [
      { label: "Location", key: "location", type: "select", options: [
        { label: "India", value: "india" },
        { label: "Ontario, Canada", value: "ontario" },
      ], defaultValue: "india" },
      { label: "Amount", key: "amount", type: "number", placeholder: "e.g., 10000", min: 1, defaultValue: 10000 },
      { label: "GST Rate (%)", key: "gstRate", type: "select", options: [
        { label: "5%", value: "5" }, { label: "12%", value: "12" },
        { label: "18%", value: "18" }, { label: "28%", value: "28" },
      ], defaultValue: "18" },
      { label: "Mode", key: "mode", type: "radio", options: [
        { label: "Exclusive", value: "exclusive" }, { label: "Inclusive", value: "inclusive" },
      ], defaultValue: "exclusive" },
    ],
    compute: (inputs) => {
      const location = String(inputs.location);
      const amount = Number(inputs.amount);

      if (location === "ontario") {
        const calcType = String(inputs.mode);
        const hstRate = 0.13;
        const gstRate = 0.05;
        const pstRate = 0.08;
        let preTax = 0, hst = 0, total = 0, gst = 0, pst = 0;
        if (calcType === "exclusive") {
          preTax = amount;
          gst = Math.round(amount * gstRate * 100) / 100;
          pst = Math.round(amount * pstRate * 100) / 100;
          hst = Math.round(amount * hstRate * 100) / 100;
          total = Math.round(amount * (1 + hstRate) * 100) / 100;
        } else {
          total = amount;
          preTax = Math.round(amount / (1 + hstRate) * 100) / 100;
          hst = Math.round((amount - preTax) * 100) / 100;
          gst = Math.round(preTax * gstRate * 100) / 100;
          pst = Math.round(preTax * pstRate * 100) / 100;
        }
        return [
          { label: "Pre-Tax Amount", key: "preTax", value: preTax, unit: "$", color: "blue" },
          { label: "GST (5%)", key: "gst", value: gst, unit: "$", color: "amber" },
          { label: "PST (8%)", key: "pst", value: pst, unit: "$", color: "amber" },
          { label: "Total HST (13%)", key: "totalHst", value: hst, unit: "$", color: "red" },
          { label: "Total with Tax", key: "total", value: total, unit: "$", color: "green" },
        ];
      }

      const rate = Number(inputs.gstRate);
      if (inputs.mode === "exclusive") {
        const gst = amount * rate / 100;
        return [
          { label: "Base Amount", key: "baseAmount", value: Math.round(amount * 100) / 100, unit: "₹", color: "default" },
          { label: "GST Amount", key: "gstAmount", value: Math.round(gst * 100) / 100, unit: "₹", color: "blue" },
          { label: "Total", key: "total", value: Math.round((amount + gst) * 100) / 100, unit: "₹", color: "green" },
        ];
      }
      const base = amount * 100 / (100 + rate);
      return [
        { label: "Base Amount", key: "baseAmount", value: Math.round(base * 100) / 100, unit: "₹", color: "default" },
        { label: "GST Amount", key: "gstAmount", value: Math.round((amount - base) * 100) / 100, unit: "₹", color: "blue" },
        { label: "Total", key: "total", value: Math.round(amount * 100) / 100, unit: "₹", color: "green" },
      ];
    },
    chart: (results) => {
      const isOntario = results.some(r => r.key === "preTax");
      if (isOntario) {
        const preTax = results.find(r => r.key === "preTax")?.value as number || 0;
        const gst = results.find(r => r.key === "gst")?.value as number || 0;
        const pst = results.find(r => r.key === "pst")?.value as number || 0;
        return {
          type: "doughnut",
          data: {
            labels: ["Pre-Tax Amount", "GST (5%)", "PST (8%)"],
            datasets: [{
              data: [preTax, gst, pst],
              backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)"],
              borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
              borderWidth: 2,
            }],
          },
          options: { responsive: true, plugins: { legend: { position: "bottom" } } },
        };
      }
      const base = results.find(r => r.key === "baseAmount")?.value as number || 0;
      const gst = results.find(r => r.key === "gstAmount")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Base Amount", "GST Amount"],
          datasets: [{
            data: [base, gst],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { location: "india", amount: 10000, gstRate: "18", mode: "exclusive" }, results: [] },
    faqs: [
      { question: "What is GST?", answer: "Goods and Services Tax is a value-added tax on most goods and services in India." },
      { question: "What is the difference between inclusive and exclusive GST?", answer: "Exclusive means GST is added to the base price at checkout. Inclusive means GST is already included in the displayed price." },
      { question: "What are the GST slabs in India?", answer: "India has four main GST slabs: 5% on essentials, 12% on processed goods, 18% on most items, and 28% on luxury goods." },
      { question: "What is the Ontario HST rate?", answer: "Ontario's HST rate is 13%, consisting of 5% federal GST and 8% provincial PST (Ontario portion)." },
      { question: "How do I remove HST from a total?", answer: "Divide the total by 1.13 to get the pre-tax amount. For example, $113 ÷ 1.13 = $100 pre-tax, and $113 - $100 = $13 HST." },
      { question: "Can businesses claim input tax credits?", answer: "Yes, registered businesses can claim input tax credit for GST/HST paid on business expenses, reducing their net tax liability." },
      { question: "What items are exempt from HST in Ontario?", answer: "Basic groceries, child care, prescription drugs, medical devices, educational services, and residential rent are generally exempt from HST in Ontario." },
      { question: "Is the HST rate the same across Canada?", answer: "No. Some provinces use HST (Ontario 13%, Quebec 14.975%), others use separate GST + PST, and Alberta has only 5% GST." },
    ],
    relatedSlugs: ["tax-calculator", "salary-calculator", "percentage-calculator", "discount-calculator"],
  },
  {
    icon: Receipt,
    name: "Tax Calculator",
    slug: "tax-calculator",
    category: "finance",
    description: "Estimate your income tax liability under old and new tax regimes.",
    metaTitle: "Tax Calculator | Free Online Income Tax Calculator",
    metaDescription: "Calculate your income tax with our free tax calculator. Compare old and new tax regimes.",
    inputs: [
      { label: "Annual Income", key: "income", type: "number", placeholder: "e.g., 1200000", min: 1, step: 10000, defaultValue: 1200000 },
      { label: "Tax Regime", key: "regime", type: "radio", options: [
        { label: "New Regime", value: "new" }, { label: "Old Regime", value: "old" },
      ], defaultValue: "new" },
    ],
    compute: (inputs) => {
      const income = Number(inputs.income);
      let tax = 0;
      if (inputs.regime === "new") {
        const remaining = income;
        const slabs = [{ limit: 300000, rate: 0 }, { limit: 600000, rate: 5 }, { limit: 900000, rate: 10 }, { limit: 1200000, rate: 15 }, { limit: 1500000, rate: 20 }];
        let prevLimit = 0;
        for (const s of slabs) {
          const taxable = Math.min(Math.max(remaining - prevLimit, 0), s.limit - prevLimit);
          tax += taxable * s.rate / 100;
          prevLimit = s.limit;
          if (remaining <= s.limit) break;
        }
        if (remaining > 1500000) tax += (remaining - 1500000) * 30 / 100;
        if (income <= 1200000) tax = 0;
      } else {
        const taxable = Math.max(0, income - 50000 - 150000);
        const remaining = taxable;
        const slabs = [{ limit: 250000, rate: 0 }, { limit: 500000, rate: 5 }, { limit: 1000000, rate: 20 }];
        let prevLimit = 0;
        for (const s of slabs) {
          const t = Math.min(Math.max(remaining - prevLimit, 0), s.limit - prevLimit);
          tax += t * s.rate / 100;
          prevLimit = s.limit;
          if (remaining <= s.limit) break;
        }
        if (remaining > 1000000) tax += (remaining - 1000000) * 30 / 100;
        if (taxable <= 500000) tax = 0;
      }
      tax = Math.round(tax * 100) / 100;
      const cess = Math.round(tax * 4 / 100 * 100) / 100;
      const totalTax = Math.round((tax + cess) * 100) / 100;
      return [
        { label: "Income Tax", key: "incomeTax", value: tax, unit: "₹", color: "red" },
        { label: "Health & Education Cess", key: "cess", value: cess, unit: "₹", color: "amber" },
        { label: "Total Tax Payable", key: "totalTax", value: totalTax, unit: "₹", color: "red" },
        { label: "Monthly Tax", key: "monthlyTax", value: Math.round(totalTax / 12 * 100) / 100, unit: "₹/mo", color: "default" },
        { label: "Effective Tax Rate", key: "effectiveRate", value: income > 0 ? Math.round(totalTax / income * 10000) / 100 : 0, unit: "%", color: "default" },
        { label: "Monthly In-Hand", key: "inHandMonthly", value: Math.round((income / 12 - totalTax / 12) * 100) / 100, unit: "₹/mo", color: "green" },
      ];
    },
    chart: (results) => {
      const incomeTax = results.find(r => r.key === "incomeTax")?.value as number || 0;
      const cess = results.find(r => r.key === "cess")?.value as number || 0;
      const inHand = results.find(r => r.key === "inHandMonthly")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Income Tax", "Cess", "Take-Home (Monthly)"],
          datasets: [{
            data: [incomeTax, cess, inHand],
            backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(239, 68, 68, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { income: 1200000, regime: "new" }, results: [] },
    faqs: [
      { question: "Which regime is better?", answer: "If you claim significant deductions, the old regime may be better. Otherwise the new regime with lower rates might help." },
      { question: "What is the difference between old and new regime?", answer: "New regime has lower rates but no deductions. Old regime has higher rates but allows 80C, HRA, etc." },
      { question: "What deductions are available under Section 80C?", answer: "Section 80C allows deductions up to ₹1.5 lakh for investments like PPF, ELSS, life insurance, EPF, and tax-saving FDs." },
      { question: "What is the Health and Education Cess?", answer: "A 4% cess is applied on the total income tax amount to fund health and education initiatives." },
      { question: "Do I need to file a tax return if my income is below the taxable limit?", answer: "If your income is below the basic exemption limit, filing is not mandatory but is recommended to claim refunds for TDS deducted." },
      { question: "What is TDS and how does it affect my tax?", answer: "TDS (Tax Deducted at Source) is tax deducted by your employer or payer. It is credited against your total tax liability when filing returns." },
      { question: "How can I reduce my taxable income?", answer: "You can invest in tax-saving instruments under Section 80C, claim HRA, get a home loan, contribute to NPS, and claim medical insurance under Section 80D." },
      { question: "Is interest from savings accounts taxable?", answer: "Interest from savings accounts is taxable under Income from Other Sources, but a deduction up to ₹10,000 is available under Section 80TTA." },
    ],
    relatedSlugs: ["salary-calculator", "gst-calculator", "percentage-calculator"],
  },
  {
    icon: DollarSign,
    name: "Salary Calculator",
    slug: "salary-calculator",
    category: "finance",
    description: "Calculate your in-hand salary from CTC with breakup and deductions.",
    metaTitle: "Salary Calculator | Calculate In-Hand Salary from CTC",
    metaDescription: "Free salary calculator to estimate your in-hand salary from CTC with detailed breakup of components and deductions.",
    inputs: [
      { label: "Annual CTC", key: "ctc", type: "number", placeholder: "e.g., 1800000", min: 1, step: 10000, defaultValue: 1800000 },
      { label: "Basic Salary %", key: "basicPercent", type: "number", placeholder: "e.g., 50", min: 10, max: 80, step: 1, defaultValue: 50 },
      { label: "HRA % of Basic", key: "hraPercent", type: "number", placeholder: "e.g., 50", min: 0, max: 100, step: 1, defaultValue: 50 },
    ],
    compute: (inputs) => {
      const ctc = Number(inputs.ctc);
      const basicPct = Number(inputs.basicPercent);
      const hraPct = Number(inputs.hraPercent);
      const annualBasic = Math.round(ctc * basicPct / 100 * 100) / 100;
      const annualHRA = Math.round(annualBasic * hraPct / 100 * 100) / 100;
      const annualGross = Math.round((annualBasic + annualHRA) * 100) / 100;
      const annualPF = Math.round(Math.min(annualBasic * 12 / 100, 180000) * 100) / 100;
      const inHandAnnual = Math.round((annualGross - annualPF) * 100) / 100;
      return [
        { label: "Annual Gross Salary", key: "annualGross", value: annualGross, unit: "₹", color: "blue" },
        { label: "Monthly Gross", key: "monthlyGross", value: Math.round(annualGross / 12 * 100) / 100, unit: "₹/mo", color: "default" },
        { label: "Annual PF Deduction", key: "annualPF", value: annualPF, unit: "₹", color: "red" },
        { label: "Annual In-Hand", key: "inHandAnnual", value: inHandAnnual, unit: "₹", color: "green" },
        { label: "Monthly In-Hand", key: "inHandMonthly", value: Math.round(inHandAnnual / 12 * 100) / 100, unit: "₹/mo", color: "green" },
      ];
    },
    chart: (results) => {
      const gross = results.find(r => r.key === "annualGross")?.value as number || 0;
      const pf = results.find(r => r.key === "annualPF")?.value as number || 0;
      const inHand = results.find(r => r.key === "inHandAnnual")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Gross Salary", "PF Deduction", "In-Hand Salary"],
          datasets: [{
            data: [gross, pf, inHand],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(239, 68, 68, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { ctc: 1800000, basicPercent: 50, hraPercent: 50 }, results: [] },
    faqs: [
      { question: "What is CTC?", answer: "Cost to Company is the total annual amount your employer spends on you including salary, benefits, and employer contributions." },
      { question: "What is the difference between CTC and in-hand?", answer: "CTC is total cost to employer. In-hand is what you receive after deductions like PF and tax." },
      { question: "What is the basic salary percentage of CTC?", answer: "Basic salary is typically 40-50% of CTC and forms the foundation for calculating HRA, PF, gratuity, and other allowances." },
      { question: "How is Provident Fund deducted?", answer: "Employee contributes 12% of basic salary to EPF, and the employer matches it. Only the employee contribution is deducted from in-hand salary." },
      { question: "What is House Rent Allowance (HRA)?", answer: "HRA is a component of salary to cover rental expenses. It is partially or fully tax-exempt depending on your rent and salary structure." },
      { question: "Does the salary include bonus and incentives?", answer: "CTC often includes components like annual bonus, performance incentives, and variable pay, which may not be paid monthly." },
      { question: "What other deductions can affect in-hand salary?", answer: "Besides PF and tax, deductions may include professional tax, insurance premiums, loan repayments, and voluntary NPS contributions." },
      { question: "How does gratuity work in salary?", answer: "Gratuity is a lump sum paid by the employer when you leave after 5+ years of service. It is calculated as 4.81% of basic salary." },
    ],
    relatedSlugs: ["tax-calculator", "gst-calculator", "percentage-calculator"],
  },
  {
    icon: DollarSign,
    name: "Currency Converter",
    slug: "currency-converter",
    category: "finance",
    description: "Convert between 30+ world currencies with exchange rates.",
    metaTitle: "Currency Converter | Free Online Currency Exchange Calculator",
    metaDescription: "Convert between 30+ world currencies with our free currency converter. Accurate exchange rates for all major currencies.",
    inputs: [
      { label: "Amount", key: "amount", type: "number", placeholder: "e.g., 100", min: 1, defaultValue: 100 },
      { label: "From Currency", key: "fromCurrency", type: "select", options: [
        { label: "USD - US Dollar", value: "USD" }, { label: "EUR - Euro", value: "EUR" },
        { label: "GBP - British Pound", value: "GBP" }, { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "INR - Indian Rupee", value: "INR" }, { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" }, { label: "CNY - Chinese Yuan", value: "CNY" },
        { label: "BRL - Brazilian Real", value: "BRL" }, { label: "KRW - South Korean Won", value: "KRW" },
        { label: "SGD - Singapore Dollar", value: "SGD" }, { label: "CHF - Swiss Franc", value: "CHF" },
        { label: "MXN - Mexican Peso", value: "MXN" }, { label: "HKD - Hong Kong Dollar", value: "HKD" },
        { label: "NZD - New Zealand Dollar", value: "NZD" }, { label: "SEK - Swedish Krona", value: "SEK" },
        { label: "NOK - Norwegian Krone", value: "NOK" }, { label: "DKK - Danish Krone", value: "DKK" },
        { label: "ZAR - South African Rand", value: "ZAR" }, { label: "TRY - Turkish Lira", value: "TRY" },
        { label: "RUB - Russian Ruble", value: "RUB" }, { label: "PLN - Polish Zloty", value: "PLN" },
        { label: "THB - Thai Baht", value: "THB" }, { label: "IDR - Indonesian Rupiah", value: "IDR" },
        { label: "HUF - Hungarian Forint", value: "HUF" }, { label: "CZK - Czech Koruna", value: "CZK" },
        { label: "ILS - Israeli Shekel", value: "ILS" }, { label: "CLP - Chilean Peso", value: "CLP" },
        { label: "PHP - Philippine Peso", value: "PHP" }, { label: "AED - UAE Dirham", value: "AED" },
        { label: "SAR - Saudi Riyal", value: "SAR" }, { label: "MYR - Malaysian Ringgit", value: "MYR" },
        { label: "RON - Romanian Leu", value: "RON" },
      ], defaultValue: "USD" },
      { label: "To Currency", key: "toCurrency", type: "select", options: [
        { label: "INR - Indian Rupee", value: "INR" }, { label: "USD - US Dollar", value: "USD" },
        { label: "EUR - Euro", value: "EUR" }, { label: "GBP - British Pound", value: "GBP" },
        { label: "JPY - Japanese Yen", value: "JPY" }, { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" }, { label: "CNY - Chinese Yuan", value: "CNY" },
        { label: "BRL - Brazilian Real", value: "BRL" }, { label: "KRW - South Korean Won", value: "KRW" },
        { label: "SGD - Singapore Dollar", value: "SGD" }, { label: "CHF - Swiss Franc", value: "CHF" },
        { label: "MXN - Mexican Peso", value: "MXN" }, { label: "HKD - Hong Kong Dollar", value: "HKD" },
        { label: "NZD - New Zealand Dollar", value: "NZD" }, { label: "SEK - Swedish Krona", value: "SEK" },
        { label: "NOK - Norwegian Krone", value: "NOK" }, { label: "DKK - Danish Krone", value: "DKK" },
        { label: "ZAR - South African Rand", value: "ZAR" }, { label: "TRY - Turkish Lira", value: "TRY" },
        { label: "RUB - Russian Ruble", value: "RUB" }, { label: "PLN - Polish Zloty", value: "PLN" },
        { label: "THB - Thai Baht", value: "THB" }, { label: "IDR - Indonesian Rupiah", value: "IDR" },
        { label: "HUF - Hungarian Forint", value: "HUF" }, { label: "CZK - Czech Koruna", value: "CZK" },
        { label: "ILS - Israeli Shekel", value: "ILS" }, { label: "CLP - Chilean Peso", value: "CLP" },
        { label: "PHP - Philippine Peso", value: "PHP" }, { label: "AED - UAE Dirham", value: "AED" },
        { label: "SAR - Saudi Riyal", value: "SAR" }, { label: "MYR - Malaysian Ringgit", value: "MYR" },
        { label: "RON - Romanian Leu", value: "RON" },
      ], defaultValue: "INR" },
    ],
    compute: (inputs) => {
      const rates: Record<string, number> = {
        USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.50, INR: 83.15,
        CAD: 1.36, AUD: 1.53, CNY: 7.24, BRL: 5.05, KRW: 1320.00,
        SGD: 1.34, CHF: 0.88, MXN: 17.15, HKD: 7.82, NZD: 1.62,
        SEK: 10.45, NOK: 10.65, DKK: 6.88, ZAR: 18.50, TRY: 30.25,
        RUB: 91.00, PLN: 4.02, THB: 35.50, IDR: 15700, HUF: 355.00,
        CZK: 23.00, ILS: 3.68, CLP: 935.00, PHP: 56.00, AED: 3.67,
        SAR: 3.75, MYR: 4.72, RON: 4.58,
      };
      const amount = Number(inputs.amount);
      const from = inputs.fromCurrency as string;
      const to = inputs.toCurrency as string;
      const usdAmount = amount / rates[from];
      const converted = Math.round(usdAmount * rates[to] * 100) / 100;
      const rate = Math.round(rates[to] / rates[from] * 1000000) / 1000000;
      return [
        { label: "Converted Amount", key: "converted", value: converted, unit: to, color: "green" },
        { label: "Exchange Rate", key: "exchangeRate", value: rate, unit: from + "/" + to, color: "default" },
        { label: "Original Amount", key: "originalAmount", value: amount, unit: from, color: "default" },
      ];
    },
    example: { inputs: { amount: 100, fromCurrency: "USD", toCurrency: "INR" }, results: [] },
    faqs: [
      { question: "Are exchange rates live?", answer: "Rates provided are reference rates and may not reflect real-time market rates." },
      { question: "Why do rates vary between providers?", answer: "Different providers use different margins and update frequencies." },
      { question: "What is the bid-ask spread in currency exchange?", answer: "The bid price is what buyers are willing to pay and the ask price is what sellers want. The difference (spread) is how providers make money." },
      { question: "Which currency pairs are most traded?", answer: "The most traded pairs are EUR/USD, USD/JPY, GBP/USD, and USD/CHF, which together account for most forex market volume." },
      { question: "How often do exchange rates change?", answer: "Exchange rates change continuously in the forex market, 24 hours a day, 5 days a week, driven by supply and demand." },
      { question: "What factors influence exchange rates?", answer: "Interest rates, inflation, political stability, economic growth, trade balances, and market speculation all affect currency values." },
      { question: "Should I exchange currency at an airport?", answer: "Airport exchange counters typically offer the worst rates due to convenience fees. Banks or online transfers usually provide better rates." },
      { question: "What is a base currency and quote currency?", answer: "In a currency pair like USD/INR, the first currency (USD) is the base, and the second (INR) is the quote. The rate shows how much quote currency equals one base unit." },
    ],
    relatedSlugs: ["percentage-calculator", "gst-calculator"],
  },
  {
    icon: GraduationCap,
    name: "Student Loan Repayment Calculator",
    slug: "student-loan-repayment-calculator",
    category: "finance",
    description: "Estimate monthly payments, total interest, payoff date, IBR, and PSLF forgiveness for federal and private student loans.",
    metaTitle: "Student Loan Repayment Calculator with Forgiveness Estimator | Measurely",
    metaDescription: "Free student loan repayment calculator to estimate monthly payments, total interest, early payoff savings, IBR payments, and PSLF forgiveness. Compare repayment plans and see how extra payments reduce your debt faster.",
    inputs: [
      { label: "Loan Amount", key: "loanAmount", type: "number", placeholder: "e.g., 35000", min: 1, step: 1000, defaultValue: 35000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 5.5", min: 0, max: 100, step: 0.1, defaultValue: 5.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 10", min: 1, max: 50, defaultValue: 10 },
      { label: "Loan Type", key: "loanType", type: "select", options: [
        { label: "Federal", value: "federal" },
        { label: "Private", value: "private" },
      ], defaultValue: "federal" },
      { label: "Repayment Plan", key: "repaymentPlan", type: "select", options: [
        { label: "Standard", value: "standard" },
        { label: "Graduated", value: "graduated" },
        { label: "Extended", value: "extended" },
        { label: "Income-Based (IBR)", value: "ibr" },
      ], defaultValue: "standard" },
      { label: "Annual Income", key: "annualIncome", type: "number", placeholder: "e.g., 55000", min: 0, step: 1000, defaultValue: 55000 },
      { label: "Family Size", key: "familySize", type: "number", placeholder: "e.g., 1", min: 1, max: 20, defaultValue: 1 },
      { label: "Extra Monthly Payment", key: "extraMonthly", type: "number", placeholder: "e.g., 100", min: 0, step: 10, defaultValue: 0 },
      { label: "One-Time Extra Payment", key: "oneTimeExtra", type: "number", placeholder: "e.g., 0", min: 0, step: 100, defaultValue: 0 },
      { label: "Loan Start Date", key: "startDate", type: "date", defaultValue: "2026-07-01" },
    ],
    compute: (inputs) => {
      const P = Number(inputs.loanAmount);
      const annualRate = Number(inputs.interestRate);
      const years = Number(inputs.loanTerm);
      const monthlyRate = annualRate / 12 / 100;
      const extraMonthly = Number(inputs.extraMonthly) || 0;
      const oneTimeExtra = Number(inputs.oneTimeExtra) || 0;
      const income = Number(inputs.annualIncome);
      const familySize = Number(inputs.familySize);
      const plan = inputs.repaymentPlan as string;

      let effectiveTerm = plan === "extended" ? Math.max(years, 25) : plan === "ibr" ? 25 : years;
      const N_total = effectiveTerm * 12;

      let monthlyPayment: number;
      if (plan === "ibr") {
        const povertyLine = 15060 + (familySize - 1) * 5380;
        const discretionary = Math.max(0, income - 1.5 * povertyLine);
        const ibrMonthly = discretionary * 0.10 / 12;
        const stdPay25 = P * monthlyRate * Math.pow(1 + monthlyRate, 300) / (Math.pow(1 + monthlyRate, 300) - 1);
        monthlyPayment = Math.min(Math.max(ibrMonthly, 0), stdPay25);
        if (monthlyPayment <= 0 || !isFinite(monthlyPayment)) monthlyPayment = 0;
      } else {
        monthlyPayment = P * monthlyRate * Math.pow(1 + monthlyRate, N_total) / (Math.pow(1 + monthlyRate, N_total) - 1);
      }
      if (!isFinite(monthlyPayment) || monthlyPayment <= 0) monthlyPayment = P / N_total;

      let bal = P, totalInt = 0, totalPaid = 0, months = 0;
      for (let i = 0; i < N_total && bal > 0.01; i++) {
        let payment = monthlyPayment;
        if (plan === "graduated") {
          const step = Math.floor(i / 24);
          const maxSteps = Math.max(1, Math.floor(N_total / 24));
          const graduationFactor = 1 + (step / maxSteps) * 0.5;
          payment = monthlyPayment * graduationFactor;
        }
        const intPart = bal * monthlyRate;
        const prinPart = payment - intPart;
        if (prinPart <= 0) break;
        bal -= prinPart;
        totalInt += intPart;
        totalPaid += payment;
        months++;
      }
      if (bal < 0) { totalPaid += bal; bal = 0; }
      const payoffDate = new Date(inputs.startDate as string);
      payoffDate.setMonth(payoffDate.getMonth() + months);

      let bal2 = P, totalInt2 = 0, totalPaid2 = 0, months2 = 0;
      for (let i = 0; i < N_total && bal2 > 0.01; i++) {
        let payment = monthlyPayment;
        if (plan === "graduated") {
          const step = Math.floor(i / 24);
          const maxSteps = Math.max(1, Math.floor(N_total / 24));
          payment = monthlyPayment * (1 + (step / maxSteps) * 0.5);
        }
        const extra = (i === 0 && oneTimeExtra > 0) ? oneTimeExtra : extraMonthly;
        const totalPayment = payment + extra;
        const intPart = bal2 * monthlyRate;
        const prinPart = totalPayment - intPart;
        if (prinPart <= 0) break;
        bal2 -= prinPart;
        totalInt2 += intPart;
        totalPaid2 += totalPayment;
        months2++;
      }
      if (bal2 < 0) { totalPaid2 += bal2; bal2 = 0; }
      const payoffDate2 = new Date(inputs.startDate as string);
      payoffDate2.setMonth(payoffDate2.getMonth() + months2);

      let forgivenAmount = 0, forgivenDate = "";
      if (plan === "ibr" && monthlyPayment > 0) {
        let balF = P;
        for (let i = 0; i < 300 && balF > 0.01; i++) {
          const intPart = balF * monthlyRate;
          const prinPart = Math.max(0, monthlyPayment - intPart);
          balF -= prinPart;
          if (balF <= 0.01) { balF = 0; break; }
        }
        if (balF > 0.01) forgivenAmount = Math.round(balF * 100) / 100;
        const fDate = new Date(inputs.startDate as string);
        fDate.setFullYear(fDate.getFullYear() + 25);
        forgivenDate = fDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      }

      const interestSaved = Math.round((totalInt - totalInt2) * 100) / 100;
      const monthsSaved = months - months2;

      const formatDate = (d: Date) => d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
      const payoffLabel = formatDate(payoffDate);
      const earlyPayoffLabel = formatDate(payoffDate2);

      return [
        { label: "Monthly Payment", key: "monthlyPayment", value: Math.round(monthlyPayment * 100) / 100, unit: "$", color: "blue" },
        { label: "Total Interest", key: "totalInterest", value: Math.round(totalInt * 100) / 100, unit: "$", color: "red" },
        { label: "Total Amount Paid", key: "totalPaid", value: Math.round(totalPaid * 100) / 100, unit: "$", color: "default" },
        { label: "Loan Payoff Date", key: "payoffDate", value: payoffLabel, color: "green" },
        { label: "Payment with Extra", key: "paymentWithExtra", value: Math.round((monthlyPayment + extraMonthly) * 100) / 100, unit: "$", color: "blue" },
        { label: "Total Interest (Extra)", key: "totalInterestWithExtra", value: Math.round(totalInt2 * 100) / 100, unit: "$", color: "green" },
        { label: "Total Paid (Extra)", key: "totalPaidWithExtra", value: Math.round(totalPaid2 * 100) / 100, unit: "$", color: "default" },
        { label: "Early Payoff Date", key: "earlyPayoffDate", value: earlyPayoffLabel, color: "green" },
        { label: "Interest Saved", key: "interestSaved", value: interestSaved, unit: "$", color: "green" },
        { label: "Months Saved", key: "monthsSaved", value: monthsSaved, color: "green" },
        { label: "Forgiveness Estimate", key: "forgivenessAmount", value: forgivenAmount > 0 ? "$" + Math.round(forgivenAmount).toLocaleString() : "N/A", color: forgivenAmount > 0 ? "amber" : "default" },
        { label: "Forgiveness Date", key: "forgivenessDate", value: forgivenDate || "N/A", color: forgivenAmount > 0 ? "amber" : "default" },
        { label: "Remaining After Term", key: "remainingBalance", value: Math.round(bal * 100) / 100, unit: "$", color: bal > 0 ? "red" : "green" },
      ];
    },
    chart: (results, inputs) => {
      const P = Number(inputs.loanAmount);
      const annualRate = Number(inputs.interestRate);
      const monthlyRate = annualRate / 12 / 100;
      const extraMonthly = Number(inputs.extraMonthly) || 0;
      const oneTimeExtra = Number(inputs.oneTimeExtra) || 0;
      const income = Number(inputs.annualIncome);
      const familySize = Number(inputs.familySize);
      const plan = inputs.repaymentPlan as string;
      const years = Number(inputs.loanTerm);
      const effectiveTerm = plan === "extended" ? Math.max(years, 25) : plan === "ibr" ? 25 : years;
      const N_total = effectiveTerm * 12;

      let monthlyPayment: number;
      if (plan === "ibr") {
        const povertyLine = 15060 + (familySize - 1) * 5380;
        const discretionary = Math.max(0, income - 1.5 * povertyLine);
        const ibrMonthly = discretionary * 0.10 / 12;
        const stdPay25 = P * monthlyRate * Math.pow(1 + monthlyRate, 300) / (Math.pow(1 + monthlyRate, 300) - 1);
        monthlyPayment = Math.min(Math.max(ibrMonthly, 0), stdPay25);
        if (monthlyPayment <= 0 || !isFinite(monthlyPayment)) monthlyPayment = P / N_total;
      } else {
        monthlyPayment = P * monthlyRate * Math.pow(1 + monthlyRate, N_total) / (Math.pow(1 + monthlyRate, N_total) - 1);
      }
      if (!isFinite(monthlyPayment) || monthlyPayment <= 0) monthlyPayment = P / N_total;

      const labels: string[] = [];
      const dataStandard: number[] = [];
      const dataExtra: number[] = [];

      let balStd = P;
      let balExt = P;
      const step = Math.max(1, Math.floor(N_total / 60));

      for (let i = 0; i <= N_total && (balStd > 0.01 || balExt > 0.01); i += step) {
        const year = Math.floor(i / 12);
        const month = i % 12;
        labels.push(`Y${year}M${month}`);

        for (let j = 0; j < step && i + j < N_total; j++) {
          if (balStd > 0.01) {
            let payment = monthlyPayment;
            if (plan === "graduated") {
              const stepIdx = Math.floor((i + j) / 24);
              const maxSteps = Math.max(1, Math.floor(N_total / 24));
              payment = monthlyPayment * (1 + (stepIdx / maxSteps) * 0.5);
            }
            const intPart = balStd * monthlyRate;
            const prinPart = payment - intPart;
            if (prinPart > 0) balStd -= prinPart;
          }
          if (balExt > 0.01) {
            let payment = monthlyPayment;
            if (plan === "graduated") {
              const stepIdx = Math.floor((i + j) / 24);
              const maxSteps = Math.max(1, Math.floor(N_total / 24));
              payment = monthlyPayment * (1 + (stepIdx / maxSteps) * 0.5);
            }
            const extra = (i + j === 0 && oneTimeExtra > 0) ? oneTimeExtra : extraMonthly;
            const totalPayment = payment + extra;
            const intPart = balExt * monthlyRate;
            const prinPart = totalPayment - intPart;
            if (prinPart > 0) balExt -= prinPart;
          }
        }

        dataStandard.push(Math.round(Math.max(0, balStd) * 100) / 100);
        dataExtra.push(Math.round(Math.max(0, balExt) * 100) / 100);

        if (balStd <= 0.01 && balExt <= 0.01) break;
      }

      return {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Without Extra Payments",
              data: dataStandard,
              borderColor: "rgba(239, 68, 68, 0.8)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
            {
              label: "With Extra Payments",
              data: dataExtra,
              borderColor: "rgba(34, 197, 94, 0.8)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (ctx: { dataset: { label: string }; parsed: { y: number } }) =>
                  ctx.dataset.label + ": $" + ctx.parsed.y.toLocaleString(),
              },
            },
          },
          scales: {
            y: { beginAtZero: true, ticks: { callback: (v: unknown) => "$" + Number(v).toLocaleString() } },
            x: { ticks: { maxTicksLimit: 12 } },
          },
        },
      };
    },
    example: {
      inputs: { loanAmount: 35000, interestRate: 5.5, loanTerm: 10, loanType: "federal", repaymentPlan: "standard", annualIncome: 55000, familySize: 1, extraMonthly: 100, oneTimeExtra: 0, startDate: "2026-07-01" },
      results: [],
    },
    faqs: [
      { question: "What is the difference between federal and private student loans?", answer: "Federal student loans are funded by the government and offer income-driven repayment plans, forgiveness programs, and fixed interest rates. Private loans are from banks or credit unions with rates based on credit, and generally offer fewer repayment options and no federal forgiveness programs." },
      { question: "How does income-based repayment (IBR) work?", answer: "IBR caps your monthly payment at 10% of your discretionary income (income above 150% of the poverty line). After 25 years of qualifying payments, any remaining balance is forgiven. Your payment is also capped at the standard 10-year repayment amount." },
      { question: "What is PSLF and am I eligible?", answer: "Public Service Loan Forgiveness (PSLF) forgives the remaining balance on federal Direct Loans after 120 qualifying monthly payments (10 years) while working full-time for a qualifying employer, such as government or nonprofit organizations." },
      { question: "Can extra payments reduce my interest?", answer: "Yes. Any extra payment goes directly toward reducing your principal balance, which reduces the amount that accrues interest going forward. Even $50 extra per month can save thousands in interest over the life of a typical student loan." },
      { question: "What is the standard repayment plan?", answer: "The standard repayment plan sets fixed monthly payments over a 10-year term (or up to 30 years for consolidated loans). You pay the same amount each month until the loan is fully repaid." },
      { question: "How does the graduated repayment plan work?", answer: "Graduated repayment starts with lower payments that increase every two years. This plan is designed for borrowers who expect their income to grow over time. Payments never exceed 1.5 times the standard payment." },
      { question: "What is the extended repayment plan?", answer: "Extended repayment stretches your loan term up to 25 years, lowering monthly payments but increasing total interest paid. This option is available for borrowers with more than $30,000 in Direct Loans." },
      { question: "Is student loan forgiveness taxable?", answer: "Under current law, forgiven student loan amounts may be considered taxable income by the IRS, unless specific exceptions apply. PSLF forgiveness is not taxable, but IBR forgiveness after 25 years may be taxable at the state and federal level." },
    ],
    relatedSlugs: ["loan-calculator", "interest-calculator", "compound-interest-calculator", "salary-calculator", "tax-calculator", "gst-calculator"],
    formula: "M = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1), IBR = 10% of discretionary income / 12",
  },
  {
    icon: Heart,
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "health",
    description: "Calculate your Body Mass Index and understand your health category.",
    metaTitle: "BMI Calculator | Calculate Body Mass Index Online",
    metaDescription: "Free online BMI calculator to check your Body Mass Index and understand your weight category.",
    inputs: [
      { label: "Weight", key: "weight", type: "number", placeholder: "e.g., 70", min: 1, max: 500, step: 0.1, defaultValue: 70 },
      { label: "Weight Unit", key: "weightUnit", type: "select", options: [{ label: "kg", value: "kg" }, { label: "lbs", value: "lbs" }], defaultValue: "kg" },
      { label: "Height", key: "height", type: "number", placeholder: "e.g., 175", min: 1, max: 300, step: 0.1, defaultValue: 175 },
      { label: "Height Unit", key: "heightUnit", type: "select", options: [{ label: "cm", value: "cm" }, { label: "ft", value: "ft" }], defaultValue: "cm" },
    ],
    compute: (inputs) => {
      let w = Number(inputs.weight);
      let h = Number(inputs.height);
      if (inputs.weightUnit === "lbs") w = w * 0.453592;
      if (inputs.heightUnit === "ft") h = h * 30.48;
      const bmi = Math.round(w / Math.pow(h / 100, 2) * 10) / 10;
      let cat: string, color: string;
      if (bmi < 18.5) { cat = "Underweight"; color = "amber"; }
      else if (bmi < 25) { cat = "Normal"; color = "green"; }
      else if (bmi < 30) { cat = "Overweight"; color = "amber"; }
      else { cat = "Obese"; color = "red"; }
      const minN = Math.round(18.5 * Math.pow(h / 100, 2) * 10) / 10;
      const maxN = Math.round(24.9 * Math.pow(h / 100, 2) * 10) / 10;
      return [
        { label: "BMI", key: "bmi", value: bmi, color: color as "green" | "red" | "amber" | "blue" | "default" },
        { label: "Category", key: "category", value: cat, color: color as "green" | "red" | "amber" | "blue" | "default" },
        { label: "Normal Weight Range", key: "normalRange", value: minN + " - " + maxN + " kg", color: "default" },
      ];
    },
    chart: (results) => {
      const bmi = results.find(r => r.key === "bmi")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Your BMI", "Underweight", "Normal", "Overweight", "Obese"],
          datasets: [
            {
              label: "BMI Range",
              data: [bmi, 18.5, 24.9, 29.9, 35],
              backgroundColor: [
                "rgba(99, 102, 241, 0.8)",
                "rgba(245, 158, 11, 0.5)",
                "rgba(34, 197, 94, 0.5)",
                "rgba(245, 158, 11, 0.5)",
                "rgba(239, 68, 68, 0.5)",
              ],
              borderColor: [
                "rgba(99, 102, 241, 1)",
                "rgba(245, 158, 11, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(245, 158, 11, 1)",
                "rgba(239, 68, 68, 1)",
              ],
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      };
    },
    example: { inputs: { weight: 70, weightUnit: "kg", height: 175, heightUnit: "cm" }, results: [] },
    faqs: [
      { question: "What is BMI?", answer: "Body Mass Index estimates body fat based on height and weight." },
      { question: "Is BMI accurate?", answer: "BMI is useful but may overestimate fat in athletes and underestimate in older adults." },
      { question: "What is a healthy BMI range?", answer: "A BMI between 18.5 and 24.9 is considered healthy. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese." },
      { question: "Can BMI differ by ethnicity?", answer: "Yes, some ethnic groups have higher health risks at lower BMI levels. For example, Asians may have elevated risks starting at BMI 23." },
      { question: "How can I lower my BMI?", answer: "Lowering BMI requires creating a calorie deficit through balanced nutrition, regular exercise, and maintaining consistent healthy habits." },
      { question: "What is the difference between BMI and body fat percentage?", answer: "BMI uses only height and weight and does not distinguish fat from muscle. Body fat percentage directly measures fat mass." },
      { question: "Should children use the same BMI chart?", answer: "Children use percentile-based BMI charts adjusted for age and gender, not the same fixed ranges as adults." },
      { question: "Can pregnancy affect BMI readings?", answer: "Yes, BMI is not accurate during pregnancy as weight gain from the baby and fluids distorts the measurement." },
    ],
    relatedSlugs: ["bmr-calculator", "body-fat-calculator", "ideal-weight-calculator"],
    formula: "BMI = Weight (kg) / Height² (m²)",
  },
  {
    icon: Flame,
    name: "BMR Calculator",
    slug: "bmr-calculator",
    category: "health",
    description: "Calculate your Basal Metabolic Rate and daily calorie needs.",
    metaTitle: "BMR Calculator | Calculate Basal Metabolic Rate Online",
    metaDescription: "Free BMR calculator using the Mifflin-St Jeor equation. Find your BMR, TDEE, and daily calorie needs.",
    inputs: [
      { label: "Weight", key: "weight", type: "number", placeholder: "e.g., 70", min: 1, max: 500, step: 0.1, defaultValue: 70 },
      { label: "Weight Unit", key: "weightUnit", type: "select", options: [{ label: "kg", value: "kg" }, { label: "lbs", value: "lbs" }], defaultValue: "kg" },
      { label: "Height", key: "height", type: "number", placeholder: "e.g., 175", min: 1, max: 300, step: 0.1, defaultValue: 175 },
      { label: "Height Unit", key: "heightUnit", type: "select", options: [{ label: "cm", value: "cm" }, { label: "ft", value: "ft" }], defaultValue: "cm" },
      { label: "Age", key: "age", type: "number", placeholder: "e.g., 30", min: 1, max: 150, defaultValue: 30 },
      { label: "Gender", key: "gender", type: "radio", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }], defaultValue: "male" },
    ],
    compute: (inputs) => {
      let w = Number(inputs.weight);
      let h = Number(inputs.height);
      const a = Number(inputs.age);
      if (inputs.weightUnit === "lbs") w = w * 0.453592;
      if (inputs.heightUnit === "ft") h = h * 30.48;
      const bmr = Math.round(inputs.gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161);
      return [
        { label: "BMR", key: "bmr", value: bmr, unit: "kcal/day", color: "blue" },
        { label: "TDEE (Moderate)", key: "tdee", value: Math.round(bmr * 1.55), unit: "kcal/day", color: "green" },
        { label: "Sedentary", key: "sedentary", value: Math.round(bmr * 1.2), unit: "kcal/day", color: "default" },
        { label: "Light Activity", key: "light", value: Math.round(bmr * 1.375), unit: "kcal/day", color: "default" },
        { label: "Active", key: "active", value: Math.round(bmr * 1.725), unit: "kcal/day", color: "default" },
        { label: "Very Active", key: "veryActive", value: Math.round(bmr * 1.9), unit: "kcal/day", color: "default" },
      ];
    },
    example: { inputs: { weight: 70, weightUnit: "kg", height: 175, heightUnit: "cm", age: 30, gender: "male" }, results: [] },
    faqs: [
      { question: "What is BMR?", answer: "Basal Metabolic Rate is the minimum calories your body needs for basic life functions at rest." },
      { question: "What is TDEE?", answer: "Total Daily Energy Expenditure is BMR plus calories burned through activity and digestion." },
      { question: "What factors affect my BMR?", answer: "Age, gender, weight, height, muscle mass, and genetics all influence BMR. Muscle mass increases BMR, while aging decreases it." },
      { question: "What is the Mifflin-St Jeor equation?", answer: "It is the most accurate BMR formula: For men, BMR = 10W + 6.25H - 5A + 5. For women, BMR = 10W + 6.25H - 5A - 161." },
      { question: "Does exercise increase BMR permanently?", answer: "Exercise builds muscle, which raises BMR long-term. The calorie burn from the workout itself is temporary, but muscle mass provides lasting increases." },
      { question: "How does age affect BMR?", answer: "BMR decreases by about 1-2% per decade after age 20, primarily due to muscle loss. Strength training can help offset this decline." },
      { question: "Can I use BMR to plan weight loss?", answer: "Yes, eating below your TDEE (not BMR) creates a calorie deficit. Never eat below your BMR as it can slow metabolism and cause health issues." },
      { question: "Why do men typically have higher BMR than women?", answer: "Men generally have more muscle mass and less body fat than women of the same weight, and muscle tissue burns more calories at rest." },
    ],
    relatedSlugs: ["bmi-calculator", "body-fat-calculator", "calorie-calculator"],
    formula: "BMR (Men) = 10 × W + 6.25 × H − 5 × A + 5",
  },
  {
    icon: Ruler,
    name: "Body Fat Calculator",
    slug: "body-fat-calculator",
    category: "health",
    description: "Estimate your body fat percentage using circumference measurements.",
    metaTitle: "Body Fat Calculator | Estimate Body Fat Percentage",
    metaDescription: "Free body fat calculator using US Navy circumference method. Estimate body fat percentage and fitness category.",
    inputs: [
      { label: "Waist (cm)", key: "waist", type: "number", placeholder: "e.g., 80", min: 1, max: 300, step: 0.1, defaultValue: 80 },
      { label: "Neck (cm)", key: "neck", type: "number", placeholder: "e.g., 38", min: 1, max: 100, step: 0.1, defaultValue: 38 },
      { label: "Height (cm)", key: "height", type: "number", placeholder: "e.g., 175", min: 1, max: 300, step: 0.1, defaultValue: 175 },
      { label: "Gender", key: "gender", type: "radio", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }], defaultValue: "male" },
      { label: "Hip (cm, female)", key: "hip", type: "number", placeholder: "e.g., 95", min: 1, max: 200, step: 0.1, defaultValue: 95 },
    ],
    compute: (inputs) => {
      const waist = Number(inputs.waist);
      const neck = Number(inputs.neck);
      const height = Number(inputs.height);
      const hip = Number(inputs.hip) || waist;
      let bf: number;
      if (inputs.gender === "male") {
        bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
      } else {
        bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
      }
      bf = Math.round(bf * 10) / 10;
      let cat: string, color: string;
      if (inputs.gender === "male") {
        if (bf < 6) { cat = "Essential Fat"; color = "amber"; }
        else if (bf < 14) { cat = "Athletic"; color = "green"; }
        else if (bf < 18) { cat = "Fit"; color = "green"; }
        else if (bf < 25) { cat = "Average"; color = "amber"; }
        else { cat = "Obese"; color = "red"; }
      } else {
        if (bf < 14) { cat = "Essential Fat"; color = "amber"; }
        else if (bf < 21) { cat = "Athletic"; color = "green"; }
        else if (bf < 25) { cat = "Fit"; color = "green"; }
        else if (bf < 32) { cat = "Average"; color = "amber"; }
        else { cat = "Obese"; color = "red"; }
      }
      return [
        { label: "Body Fat", key: "bodyFat", value: bf, unit: "%", color: color as "green" | "red" | "amber" | "blue" | "default" },
        { label: "Category", key: "category", value: cat, color: color as "green" | "red" | "amber" | "blue" | "default" },
      ];
    },
    example: { inputs: { waist: 80, neck: 38, height: 175, gender: "male", hip: 95 }, results: [] },
    faqs: [
      { question: "How accurate is this method?", answer: "The US Navy method has about 3-4% error margin. It is more accurate than BMI but less than DEXA scans." },
      { question: "What is a healthy body fat percentage?", answer: "For men 10-20%, for women 18-28% is generally healthy." },
      { question: "What is essential body fat?", answer: "Essential fat is the minimum needed for basic health. It is about 3-5% for men and 10-13% for women. Going below can cause health problems." },
      { question: "How does body fat distribution affect health?", answer: "Visceral fat (around organs) is more dangerous than subcutaneous fat. Waist circumference over 40 inches for men or 35 inches for women indicates higher risk." },
      { question: "Can body fat percentage change without weight change?", answer: "Yes, body recomposition occurs when you lose fat and gain muscle simultaneously, changing your body fat percentage while maintaining weight." },
      { question: "What is the most accurate way to measure body fat?", answer: "DEXA scans, hydrostatic weighing, and Bod Pod are most accurate. Calipers and bioelectrical impedance are less precise but more accessible." },
      { question: "How often should I measure body fat?", answer: "Monthly measurements are sufficient to track trends. Body fat fluctuates with hydration, meal timing, and other daily factors." },
      { question: "Does body fat percentage differ by sport?", answer: "Yes, endurance athletes like marathon runners often have very low body fat, while strength athletes like powerlifters may have higher percentages." },
    ],
    relatedSlugs: ["bmi-calculator", "bmr-calculator", "ideal-weight-calculator"],
    formula: "Body Fat % (Men) = 495 / (1.0324 − 0.19077 × log₁₀(waist − neck) + 0.15456 × log₁₀(height)) − 450",
  },
  {
    icon: Flame,
    name: "Calorie Calculator",
    slug: "calorie-calculator",
    category: "health",
    description: "Calculate your maintenance, cutting, and bulking calories.",
    metaTitle: "Calorie Calculator | Calculate Daily Calorie Needs",
    metaDescription: "Free calorie calculator for maintenance, cutting, and bulking calories based on your BMR and activity level.",
    inputs: [
      { label: "Weight (kg)", key: "weight", type: "number", placeholder: "e.g., 70", min: 1, max: 500, step: 0.1, defaultValue: 70 },
      { label: "Height (cm)", key: "height", type: "number", placeholder: "e.g., 175", min: 1, max: 300, step: 0.1, defaultValue: 175 },
      { label: "Age", key: "age", type: "number", placeholder: "e.g., 30", min: 1, max: 150, defaultValue: 30 },
      { label: "Gender", key: "gender", type: "radio", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }], defaultValue: "male" },
      { label: "Activity Level", key: "activityLevel", type: "select", options: [
        { label: "Sedentary", value: "sedentary" }, { label: "Light", value: "light" },
        { label: "Moderate", value: "moderate" }, { label: "Active", value: "active" },
        { label: "Very Active", value: "very_active" },
      ], defaultValue: "moderate" },
    ],
    compute: (inputs) => {
      const w = Number(inputs.weight);
      const h = Number(inputs.height);
      const a = Number(inputs.age);
      const bmr = Math.round(inputs.gender === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161);
      const mult: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
      const tdee = Math.round(bmr * mult[inputs.activityLevel as string]);
      return [
        { label: "BMR", key: "bmr", value: bmr, unit: "kcal", color: "blue" },
        { label: "Maintenance (TDEE)", key: "maintenance", value: tdee, unit: "kcal/day", color: "green" },
        { label: "Cutting", key: "cutting", value: tdee - 500, unit: "kcal/day", color: "amber" },
        { label: "Bulking", key: "bulking", value: tdee + 300, unit: "kcal/day", color: "red" },
        { label: "Protein", key: "protein", value: Math.round(w * 2.2), unit: "g/day", color: "default" },
        { label: "Fat", key: "fat", value: Math.round(tdee * 0.25 / 9), unit: "g/day", color: "default" },
      ];
    },
    example: { inputs: { weight: 70, height: 175, age: 30, gender: "male", activityLevel: "moderate" }, results: [] },
    faqs: [
      { question: "What is cutting vs bulking?", answer: "Cutting means eating fewer calories to lose fat. Bulking means eating more to gain muscle." },
      { question: "How accurate is this?", answer: "This is a starting point. Individual factors like genetics and precise activity levels may require adjustments." },
      { question: "How many calories should I eat to lose weight?", answer: "Subtract 300-500 calories from your TDEE for gradual weight loss of about 0.5 kg per week. Avoid going below 1,200 for women or 1,500 for men." },
      { question: "What macronutrient ratio is best for weight loss?", answer: "A common starting ratio is 40% protein, 30% carbs, and 30% fat. Higher protein helps preserve muscle during calorie deficits." },
      { question: "How does activity level affect calorie needs?", answer: "Sedentary individuals need much fewer calories than active ones. A very active person may need 800-1,000 more daily calories than a sedentary person of the same size." },
      { question: "Should I eat back calories burned through exercise?", answer: "For weight loss, it is generally not recommended to eat back all exercise calories, as fitness trackers often overestimate burn." },
      { question: "What is reverse dieting?", answer: "Reverse dieting is gradually increasing calories after a prolonged diet to restore metabolism without rapid fat gain." },
      { question: "How do I calculate protein needs for muscle gain?", answer: "Aim for 1.6-2.2 grams of protein per kg of body weight when bulking. The calculator estimates 2.2 g/kg as a starting target." },
    ],
    relatedSlugs: ["bmr-calculator", "bmi-calculator", "body-fat-calculator"],
    formula: "TDEE = BMR × Activity Factor (1.2 − 1.9)",
  },
  {
    icon: Droplets,
    name: "Water Intake Calculator",
    slug: "water-intake-calculator",
    category: "health",
    description: "Calculate your daily water intake needs based on weight and activity.",
    metaTitle: "Water Intake Calculator | Daily Water Intake Calculator",
    metaDescription: "Free water intake calculator to determine daily water needs based on weight and exercise.",
    inputs: [
      { label: "Weight", key: "weight", type: "number", placeholder: "e.g., 70", min: 1, max: 500, step: 0.1, defaultValue: 70 },
      { label: "Weight Unit", key: "weightUnit", type: "select", options: [{ label: "kg", value: "kg" }, { label: "lbs", value: "lbs" }], defaultValue: "kg" },
      { label: "Exercise (min/day)", key: "activityMinutes", type: "number", placeholder: "e.g., 30", min: 0, max: 600, step: 5, defaultValue: 30 },
    ],
    compute: (inputs) => {
      let w = Number(inputs.weight);
      const act = Number(inputs.activityMinutes);
      if (inputs.weightUnit === "lbs") w = w * 0.453592;
      const total = Math.round(w * 33 + Math.floor(act / 30) * 350);
      return [
        { label: "Daily Water", key: "dailyWaterML", value: total, unit: "ml", color: "blue" },
        { label: "In Ounces", key: "dailyWaterOz", value: Math.round(total / 29.5735 * 10) / 10, unit: "oz", color: "default" },
        { label: "In Cups", key: "dailyWaterCups", value: Math.round(total / 240 * 10) / 10, unit: "cups", color: "default" },
        { label: "In Liters", key: "dailyWaterL", value: Math.round(total / 1000 * 100) / 100, unit: "L", color: "green" },
      ];
    },
    example: { inputs: { weight: 70, weightUnit: "kg", activityMinutes: 30 }, results: [] },
    faqs: [
      { question: "How much water should I drink?", answer: "About 33ml per kg of body weight plus extra for exercise." },
      { question: "Can I drink too much water?", answer: "Yes, excessive intake can lead to hyponatremia. Listen to your body." },
      { question: "What are signs of dehydration?", answer: "Dark urine, dry mouth, fatigue, headache, dizziness, and infrequent urination are common signs of inadequate hydration." },
      { question: "Does coffee or tea count toward water intake?", answer: "Yes, caffeinated beverages count toward fluid intake, though they have a mild diuretic effect that does not negate their hydration benefits." },
      { question: "How does exercise affect water needs?", answer: "Add about 350 ml of water for every 30 minutes of exercise. Intense or prolonged exercise in hot conditions may require even more." },
      { question: "Do I need more water in hot weather?", answer: "Yes, hot and humid weather increases sweat loss. Increase your intake by 500-1,000 ml when spending time outdoors in high temperatures." },
      { question: "Can drinking water help with weight loss?", answer: "Drinking water before meals can promote fullness and reduce calorie intake. It also supports metabolism and helps the body burn fat efficiently." },
      { question: "What foods have high water content?", answer: "Fruits and vegetables like watermelon, cucumber, oranges, lettuce, and tomatoes are over 90% water and contribute to daily hydration." },
    ],
    relatedSlugs: ["bmi-calculator", "bmr-calculator", "calorie-calculator"],
  },
  {
    icon: Baby,
    name: "Pregnancy Calculator",
    slug: "pregnancy-calculator",
    category: "health",
    description: "Calculate due date, current week of pregnancy, and trimester.",
    metaTitle: "Pregnancy Calculator | Due Date Calculator Online",
    metaDescription: "Free pregnancy due date calculator. Calculate current week, trimester, and estimated due date from LMP.",
    inputs: [
      { label: "Weeks Since Last Period", key: "weeksPregnant", type: "number", placeholder: "e.g., 17", min: 0, max: 42, step: 0.5, defaultValue: 17 },
      { label: "Cycle Length (days)", key: "cycleLength", type: "number", placeholder: "e.g., 28", min: 21, max: 45, defaultValue: 28 },
    ],
    compute: (inputs) => {
      const week = Number(inputs.weeksPregnant);
      const cycle = Number(inputs.cycleLength);
      const left = Math.max(0, 40 - week);
      const daysLeft = left * 7 + (cycle - 28);
      const dueDate = new Date(Date.now() + daysLeft * 86400000);
      let tri: string;
      if (week <= 13) tri = "First Trimester (Week 1-13)";
      else if (week <= 27) tri = "Second Trimester (Week 14-27)";
      else tri = "Third Trimester (Week 28-40)";
      return [
        { label: "Current Week", key: "currentWeek", value: Math.min(week, 42), unit: "of pregnancy", color: "blue" },
        { label: "Due Date", key: "dueDate", value: dueDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), color: "green" },
        { label: "Trimester", key: "trimester", value: tri, color: "default" },
        { label: "Weeks Left", key: "weeksLeft", value: left, color: left > 0 ? "green" : "red" },
      ];
    },
    example: { inputs: { weeksPregnant: 17, cycleLength: 28 }, results: [] },
    faqs: [
      { question: "How is due date calculated?", answer: "40 weeks from the start of pregnancy, adjusted for cycle length." },
      { question: "Is the due date exact?", answer: "Only about 5% of babies are born on their exact due date. Full-term is 37-42 weeks." },
      { question: "What are the trimesters of pregnancy?", answer: "First trimester is weeks 1-13, second is weeks 14-27, and third is weeks 28-40. Each trimester brings different developmental milestones." },
      { question: "How is the due date adjusted for cycle length?", answer: "For cycles longer than 28 days, the due date is pushed forward. For shorter cycles, it is moved earlier by the difference in days." },
      { question: "What happens in each trimester?", answer: "First trimester: organ development. Second: growth and movement. Third: final growth and preparation for birth." },
      { question: "When should I schedule prenatal appointments?", answer: "Monthly visits for weeks 4-28, biweekly for weeks 28-36, and weekly from week 36 until delivery." },
      { question: "What is the difference between gestational age and fetal age?", answer: "Gestational age is measured from the last menstrual period (about 2 weeks before conception). Fetal age is measured from conception." },
      { question: "Can stress affect pregnancy?", answer: "High stress levels may increase the risk of preterm birth and low birth weight. Managing stress through rest, exercise, and support is important." },
    ],
    relatedSlugs: ["age-calculator", "date-calculator", "heart-rate-calculator"],
  },
  {
    icon: Activity,
    name: "Heart Rate Calculator",
      slug: "heart-rate-calculator",
    category: "health",
    description: "Calculate your maximum heart rate and optimal training zones using the Karvonen formula.",
    metaTitle: "Heart Rate Calculator | Target Heart Rate Zones Calculator",
    metaDescription: "Free heart rate calculator using the Karvonen formula for personalized maximum HR and training zones.",
    inputs: [
      { label: "Age", key: "age", type: "number", placeholder: "e.g., 30", min: 1, max: 150, defaultValue: 30 },
      { label: "Resting Heart Rate", key: "restingHR", type: "number", placeholder: "e.g., 70", min: 30, max: 220, defaultValue: 70 },
    ],
    compute: (inputs) => {
      const a = Number(inputs.age);
      const rhr = Number(inputs.restingHR);
      const m = 220 - a;
      const hrr = m - rhr;
      const zone = (lo: number, hi: number) => Math.round(hrr * lo + rhr) + "-" + Math.round(hrr * hi + rhr);
      return [
        { label: "Maximum HR", key: "maxHR", value: m, unit: "bpm", color: "red" },
        { label: "Resting HR", key: "restingHR", value: rhr, unit: "bpm", color: "default" },
        { label: "Moderate Zone (50-70%)", key: "moderate", value: zone(0.5, 0.7), unit: "bpm", color: "green" },
        { label: "Vigorous Zone (70-85%)", key: "vigorous", value: zone(0.7, 0.85), unit: "bpm", color: "amber" },
        { label: "Fat Burn Zone (60-70%)", key: "fatBurn", value: zone(0.6, 0.7), unit: "bpm", color: "blue" },
        { label: "Cardio Zone (70-80%)", key: "cardio", value: zone(0.7, 0.8), unit: "bpm", color: "default" },
        { label: "Peak Zone (80-90%)", key: "peak", value: zone(0.8, 0.9), unit: "bpm", color: "red" },
      ];
    },
    example: { inputs: { age: 30, restingHR: 70 }, results: [] },
    faqs: [
      { question: "What is maximum heart rate?", answer: "The highest beats per minute your heart can achieve during maximum physical exertion." },
      { question: "How do I measure heart rate?", answer: "Count beats for 15 seconds and multiply by 4, or use a heart rate monitor." },
      { question: "What is the Karvonen formula?", answer: "The Karvonen formula calculates target heart rate using your resting heart rate and heart rate reserve, providing more personalized zones than the 220-age method." },
      { question: "What is the best heart rate zone for fat burning?", answer: "The fat burn zone is 60-70% of your maximum heart rate. At this intensity, your body uses a higher percentage of fat for fuel." },
      { question: "What heart rate zone improves cardiovascular fitness?", answer: "The cardio zone (70-80% of max HR) improves heart and lung capacity. The peak zone (80-90%) builds speed and athletic performance." },
      { question: "What is a normal resting heart rate?", answer: "A normal resting heart rate for adults is 60-100 bpm. Athletes often have lower resting rates of 40-60 bpm due to greater cardiovascular efficiency." },
      { question: "How does age affect maximum heart rate?", answer: "Maximum heart rate decreases with age. The formula 220 minus age provides a rough estimate, though individual variations exist." },
      { question: "Can stress raise my heart rate?", answer: "Yes, stress triggers the release of cortisol and adrenaline, which increase heart rate and blood pressure as part of the fight-or-flight response." },
    ],
    relatedSlugs: ["bmi-calculator", "bmr-calculator", "calorie-calculator"],
  },
  {
    icon: Scale,
    name: "Ideal Weight Calculator",
    slug: "ideal-weight-calculator",
    category: "health",
    description: "Calculate your ideal weight range based on height and gender.",
    metaTitle: "Ideal Weight Calculator | Healthy Weight Range Calculator",
    metaDescription: "Free ideal weight calculator using the Devine formula to find your healthy weight range.",
    inputs: [
      { label: "Height", key: "height", type: "number", placeholder: "e.g., 175", min: 1, max: 300, step: 0.1, defaultValue: 175 },
      { label: "Height Unit", key: "heightUnit", type: "select", options: [{ label: "cm", value: "cm" }, { label: "ft", value: "ft" }], defaultValue: "cm" },
      { label: "Gender", key: "gender", type: "radio", options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }], defaultValue: "male" },
    ],
    compute: (inputs) => {
      let h = Number(inputs.height);
      if (inputs.heightUnit === "cm") h = h / 2.54;
      let minW: number, maxW: number;
      if (inputs.gender === "male") {
        minW = Math.round((50 + 2.3 * (h - 60)) * 10) / 10;
        maxW = Math.round((minW + 10) * 10) / 10;
      } else {
        minW = Math.round((45.5 + 2.3 * (h - 60)) * 10) / 10;
        maxW = Math.round((minW + 10) * 10) / 10;
      }
      return [
        { label: "Ideal Weight (Min)", key: "minWeight", value: minW, unit: "kg", color: "green" },
        { label: "Ideal Weight (Max)", key: "maxWeight", value: maxW, unit: "kg", color: "green" },
        { label: "In Pounds", key: "minLbs", value: Math.round(minW * 2.20462 * 10) / 10, unit: "lbs", color: "default" },
        { label: "In Pounds (Max)", key: "maxLbs", value: Math.round(maxW * 2.20462 * 10) / 10, unit: "lbs", color: "default" },
      ];
    },
    example: { inputs: { height: 175, heightUnit: "cm", gender: "male" }, results: [] },
    faqs: [
      { question: "What is ideal body weight?", answer: "An estimate of a healthy weight for a given height. It is a guideline, not an exact target." },
      { question: "How accurate is the Devine formula?", answer: "Widely used clinically but does not account for muscle mass or body composition." },
      { question: "What is the Devine formula for ideal weight?", answer: "For men: 50 kg + 2.3 kg per inch over 5 feet. For women: 45.5 kg + 2.3 kg per inch over 5 feet." },
      { question: "Should athletes use the ideal weight calculator?", answer: "Athletes with high muscle mass may exceed the calculated ideal weight while still being healthy. Body fat percentage is a better metric for them." },
      { question: "How does height affect ideal weight?", answer: "Taller individuals have higher ideal weights because their frame supports more lean body mass and bone density." },
      { question: "What is the difference between ideal weight and healthy weight range?", answer: "Ideal weight is a single estimate, while a healthy weight range (based on BMI) provides a broader acceptable span." },
      { question: "Can ideal weight vary by body frame size?", answer: "Yes, people with larger frames (wider wrists, shoulders) may have healthy weights above the formula estimate." },
      { question: "Why do women have a lower ideal weight than men at the same height?", answer: "Women naturally have a higher body fat percentage and lower muscle mass, resulting in lower lean body mass and thus a lower ideal weight." },
    ],
    relatedSlugs: ["bmi-calculator", "bmr-calculator", "body-fat-calculator"],
    formula: "Devine: Men = 50 + 0.9 × (H − 152), Women = 45.5 + 0.9 × (H − 152)",
  },
  {
    icon: Percent,
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "math",
    description: "Calculate percentages, percentage changes, and find what percent one number is of another.",
    metaTitle: "Percentage Calculator | Free Online Percentage Calculator",
    metaDescription: "Calculate percentages, increases/decreases, and find what percentage one number is of another.",
    inputs: [
      { label: "Value", key: "value", type: "number", placeholder: "e.g., 20", min: 0, defaultValue: 20 },
      { label: "Total", key: "total", type: "number", placeholder: "e.g., 200", min: 1, defaultValue: 200 },
      { label: "Mode", key: "mode", type: "radio", options: [
        { label: "Find % of value", value: "percentOf" },
        { label: "Increase", value: "increase" },
        { label: "Decrease", value: "decrease" },
      ], defaultValue: "percentOf" },
    ],
    compute: (inputs) => {
      const v = Number(inputs.value);
      const t = Number(inputs.total);
      if (inputs.mode === "percentOf") {
        return [
          { label: "Percentage", key: "percentage", value: Math.round(v / t * 10000) / 100, unit: "%", color: "green" },
          { label: v + "% of " + t, key: "part", value: Math.round(t * v / 100 * 100) / 100, color: "blue" },
        ];
      }
      const ch = Math.round((v - t) / t * 10000) / 100;
      return [
        { label: "Difference", key: "diff", value: Math.round(Math.abs(v - t) * 100) / 100, color: "default" },
        { label: inputs.mode === "increase" ? "Increase" : "Decrease", key: "pct", value: Math.abs(ch), unit: "%", color: inputs.mode === "increase" ? "green" : "red" },
      ];
    },
    chart: (results, inputs) => {
      if (inputs.mode === "percentOf") {
        const pct = results.find(r => r.key === "percentage")?.value as number || 0;
        const remaining = 100 - pct;
        return {
          type: "doughnut",
          data: {
            labels: ["Percentage", "Remaining"],
            datasets: [{
              data: [pct, remaining],
              backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(226, 232, 240, 0.8)"],
              borderColor: ["rgba(99, 102, 241, 1)", "rgba(226, 232, 240, 1)"],
              borderWidth: 2,
            }],
          },
          options: {
            responsive: true,
            plugins: { legend: { position: "bottom" } },
          },
        };
      }
      return null;
    },
    example: { inputs: { value: 20, total: 200, mode: "percentOf" }, results: [] },
    faqs: [
      { question: "How to calculate percentage?", answer: "Divide the part by the whole and multiply by 100." },
      { question: "How is percentage change calculated?", answer: "(New - Old) / Old x 100. Positive is increase, negative is decrease." },
      { question: "What is the formula for finding a percentage of a number?", answer: "Multiply the number by the percentage divided by 100. For example, 20% of 200 = 200 x 20/100 = 40." },
      { question: "How do I reverse calculate a percentage?", answer: "If you know the part and percentage, divide the part by the percentage (as a decimal). For example, 40 is 20% of 40/0.20 = 200." },
      { question: "What is a percentage point vs percent?", answer: "A percentage point is the arithmetic difference between two percentages. Percent refers to a relative change. Going from 4% to 5% is a 1 percentage point increase but a 25% increase." },
      { question: "How do I calculate percentage increase in prices?", answer: "Subtract the old price from the new price, divide by the old price, and multiply by 100. This gives the percentage increase." },
      { question: "What is a 100% increase?", answer: "A 100% increase means the value doubles. For example, going from 50 to 100 is a 100% increase." },
      { question: "How are percentages used in business?", answer: "Businesses use percentages for profit margins, tax rates, discount calculations, growth rates, and market share analysis." },
    ],
    relatedSlugs: ["fraction-calculator", "gst-calculator"],
  },
  {
    icon: Divide,
    name: "Fraction Calculator",
    slug: "fraction-calculator",
    category: "math",
    description: "Add, subtract, multiply, and divide fractions with simplified results.",
    metaTitle: "Fraction Calculator | Add, Subtract, Multiply & Divide Fractions",
    metaDescription: "Free fraction calculator for adding, subtracting, multiplying, and dividing fractions with instant simplification.",
    inputs: [
      { label: "Numerator 1", key: "num1", type: "number", placeholder: "e.g., 1", min: -1000, defaultValue: 1 },
      { label: "Denominator 1", key: "den1", type: "number", placeholder: "e.g., 3", min: 1, defaultValue: 3 },
      { label: "Operation", key: "operation", type: "select", options: [
        { label: "Add (+)", value: "add" }, { label: "Subtract (-)", value: "subtract" },
        { label: "Multiply (x)", value: "multiply" }, { label: "Divide (/)" , value: "divide" },
      ], defaultValue: "add" },
      { label: "Numerator 2", key: "num2", type: "number", placeholder: "e.g., 2", min: -1000, defaultValue: 2 },
      { label: "Denominator 2", key: "den2", type: "number", placeholder: "e.g., 5", min: 1, defaultValue: 5 },
    ],
    compute: (inputs) => {
      const n1 = Number(inputs.num1), d1 = Number(inputs.den1);
      const n2 = Number(inputs.num2), d2 = Number(inputs.den2);
      let num = 0, den = 1;
      switch (inputs.operation) {
        case "add": num = n1*d2 + n2*d1; den = d1*d2; break;
        case "subtract": num = n1*d2 - n2*d1; den = d1*d2; break;
        case "multiply": num = n1*n2; den = d1*d2; break;
        case "divide": num = n1*d2; den = d1*n2; break;
      }
      const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : Math.abs(a);
      const g = gcd(num, den);
      return [
        { label: "Result", key: "result", value: den/g === 1 ? ""+(num/g) : (num/g)+"/"+(den/g), color: "green" },
        { label: "Decimal", key: "decimal", value: Math.round(num/den*10000)/10000, color: "blue" },
        { label: "Fraction", key: "fraction", value: num+"/"+den, color: "default" },
      ];
    },
    example: { inputs: { num1: 1, den1: 3, operation: "add", num2: 2, den2: 5 }, results: [] },
    faqs: [
      { question: "How to add fractions?", answer: "Find common denominator, then add numerators. Example: 1/3 + 2/5 = 5/15 + 6/15 = 11/15." },
      { question: "How to simplify fractions?", answer: "Divide numerator and denominator by their greatest common divisor." },
      { question: "How do I multiply fractions?", answer: "Multiply the numerators together and the denominators together. Example: 1/3 x 2/5 = 2/15." },
      { question: "How do I divide fractions?", answer: "Flip the second fraction (reciprocal) and multiply. Example: 1/3 / 2/5 = 1/3 x 5/2 = 5/6." },
      { question: "What is an improper fraction?", answer: "An improper fraction has a numerator larger than its denominator, like 7/4. It can be converted to a mixed number: 1 and 3/4." },
      { question: "How do I convert a fraction to a decimal?", answer: "Divide the numerator by the denominator. Example: 3/4 = 3 / 4 = 0.75." },
      { question: "What are equivalent fractions?", answer: "Fractions that represent the same value, like 1/2, 2/4, 4/8. Multiply or divide the numerator and denominator by the same number to find equivalents." },
      { question: "How do I compare fractions?", answer: "Convert to a common denominator or cross-multiply. The larger numerator after conversion indicates the larger fraction." },
    ],
    relatedSlugs: ["percentage-calculator", "gcf-lcm-calculator", "statistics-calculator"],
  },
  {
    icon: Calculator,
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    category: "math",
    description: "Full scientific calculator with trigonometric, logarithmic, and advanced functions.",
    metaTitle: "Scientific Calculator | Free Online Scientific Calculator",
    metaDescription: "Free online scientific calculator with trigonometric, logarithmic, exponential, and advanced mathematical functions.",
    inputs: [],
    compute: () => [],
    example: { inputs: {}, results: [] },
    faqs: [
      { question: "What functions are available?", answer: "Basic arithmetic, trig functions (sin, cos, tan), log, ln, sqrt, power, pi, e, and memory." },
      { question: "How to use trigonometric functions?", answer: "Enter a number then press sin, cos, or tan. Use inv for inverse functions." },
      { question: "What is the difference between log and ln?", answer: "Log is base 10 logarithm. Ln is natural logarithm with base e (approximately 2.71828)." },
      { question: "How do I calculate powers and roots?", answer: "Use the power key (x^y or ^) for exponents. Use the sqrt key for square roots or the y-root function for other roots." },
      { question: "What is scientific notation?", answer: "Scientific notation expresses numbers as a x 10^b, like 6.022 x 10^23. Use EE or EXP key to enter the exponent." },
      { question: "How do I use parentheses in calculations?", answer: "Parentheses control the order of operations. Expressions inside parentheses are calculated first, ensuring correct results." },
      { question: "What is the factorial function?", answer: "Factorial (n!) multiplies all positive integers from 1 to n. For example, 5! = 5 x 4 x 3 x 2 x 1 = 120." },
      { question: "How do I calculate percentages on a scientific calculator?", answer: "Enter the number, press the percentage key, or multiply by the percentage as a decimal." },
    ],
    relatedSlugs: ["equation-solver", "matrix-calculator", "statistics-calculator"],
  },
  {
    icon: Grid3x3,
    name: "Matrix Calculator",
    slug: "matrix-calculator",
    category: "math",
    description: "Add, subtract, and multiply matrices.",
    metaTitle: "Matrix Calculator | Add, Subtract & Multiply Matrices Online",
    metaDescription: "Free matrix calculator for addition, subtraction, and multiplication of 2x2 and 3x3 matrices.",
    inputs: [
      { label: "Matrix Size", key: "matrixSize", type: "select", options: [
        { label: "2x2", value: "2" }, { label: "3x3", value: "3" },
      ], defaultValue: "2" },
      { label: "Operation", key: "matrixOp", type: "select", options: [
        { label: "Add (A+B)", value: "add" }, { label: "Subtract (A-B)", value: "subtract" },
        { label: "Multiply (AxB)", value: "multiply" },
      ], defaultValue: "add" },
    ],
    compute: () => [],
    example: { inputs: { matrixSize: "2", matrixOp: "add" }, results: [] },
    faqs: [
      { question: "What are the rules?", answer: "Addition/subtraction needs same dimensions. Multiplication needs columns of A = rows of B." },
      { question: "Is multiplication commutative?", answer: "No, A x B does not equal B x A in most cases." },
      { question: "What is the identity matrix?", answer: "An identity matrix has 1s on the diagonal and 0s elsewhere. Multiplying any matrix by the identity leaves it unchanged." },
      { question: "Can I multiply a 2x3 and a 3x2 matrix?", answer: "Yes, because the inner dimensions match (3=3). The result will be a 2x2 matrix." },
      { question: "What is the determinant of a matrix?", answer: "The determinant is a scalar value that indicates whether a matrix is invertible. A zero determinant means the matrix is singular and cannot be inverted." },
      { question: "What are matrices used for in real life?", answer: "Matrices are used in computer graphics for transformations, in physics for solving systems, in cryptography, and in data science." },
      { question: "What is matrix addition?", answer: "Matrix addition adds corresponding elements. Both matrices must have exactly the same dimensions for addition to work." },
      { question: "How is scalar multiplication different from matrix multiplication?", answer: "Scalar multiplication multiplies each element by a single number. Matrix multiplication involves dot products of rows and columns." },
    ],
    relatedSlugs: ["equation-solver", "scientific-calculator", "statistics-calculator"],
  },
  {
    icon: FileX,
    name: "Equation Solver",
    slug: "equation-solver",
    category: "math",
    description: "Solve linear and quadratic equations step by step.",
    metaTitle: "Equation Solver | Solve Linear & Quadratic Equations",
    metaDescription: "Free equation solver for linear and quadratic equations with discriminant and step-by-step solutions.",
    inputs: [
      { label: "Type", key: "eqType", type: "select", options: [
        { label: "Linear (ax+b=0)", value: "linear" },
        { label: "Quadratic (ax^2+bx+c=0)", value: "quadratic" },
      ], defaultValue: "quadratic" },
      { label: "a", key: "coeffA", type: "number", placeholder: "e.g., 1", min: -1000, defaultValue: 1 },
      { label: "b", key: "coeffB", type: "number", placeholder: "e.g., -3", min: -10000, defaultValue: -3 },
      { label: "c (quadratic)", key: "coeffC", type: "number", placeholder: "e.g., 2", min: -10000, defaultValue: 2 },
    ],
    compute: (inputs) => {
      const a = Number(inputs.coeffA), b = Number(inputs.coeffB), c = Number(inputs.coeffC);
      if (inputs.eqType === "linear") {
        if (a === 0) return [{ label: "Solution", key: "s", value: b === 0 ? "Infinite" : "No solution", color: b === 0 ? "blue" : "red" }];
        return [{ label: "Solution", key: "s", value: "x = " + (Math.round(-b/a*1000)/1000), color: "green" }];
      }
      const d = Math.round((b*b - 4*a*c)*1000)/1000;
      if (d < 0) {
        const r = Math.round(-b/(2*a)*1000)/1000;
        const img = Math.round(Math.sqrt(-d)/(2*a)*1000)/1000;
        return [
          { label: "Root 1", key: "r1", value: r + " + " + img + "i", color: "blue" },
          { label: "Root 2", key: "r2", value: r + " - " + img + "i", color: "blue" },
          { label: "Discriminant", key: "d", value: d, color: "red" },
        ];
      }
      const sd = Math.sqrt(d);
      return [
        { label: "Root 1", key: "r1", value: "x = " + (Math.round((-b+sd)/(2*a)*1000)/1000), color: "green" },
        { label: "Root 2", key: "r2", value: "x = " + (Math.round((-b-sd)/(2*a)*1000)/1000), color: "green" },
        { label: "Discriminant", key: "d", value: d, color: d > 0 ? "green" : "default" },
      ];
    },
    example: { inputs: { eqType: "quadratic", coeffA: 1, coeffB: -3, coeffC: 2 }, results: [] },
    faqs: [
      { question: "What is discriminant?", answer: "b^2 - 4ac determines root nature: >0 two real, =0 one real, <0 two complex." },
      { question: "How to solve linear equations?", answer: "For ax+b=0, x = -b/a. If a=0, there is no or infinite solutions." },
      { question: "What is the quadratic formula?", answer: "x = [-b ± sqrt(b^2 - 4ac)] / 2a. It solves any quadratic equation ax^2 + bx + c = 0." },
      { question: "What does it mean when the discriminant is negative?", answer: "A negative discriminant means the quadratic equation has two complex (imaginary) roots involving the imaginary unit i." },
      { question: "How do I solve a linear equation step by step?", answer: "Isolate the variable by moving terms. For ax + b = 0, subtract b from both sides, then divide by a to get x = -b/a." },
      { question: "What are real vs complex roots?", answer: "Real roots are actual numbers on the number line. Complex roots involve the square root of a negative number and include the imaginary unit i." },
      { question: "Can an equation have no solution?", answer: "Yes, for linear equations where a=0 and b≠0 (like 0x + 5 = 0), there is no solution because no x satisfies the equation." },
      { question: "What is a double root?", answer: "A double root occurs when the discriminant is zero. Both roots are the same real number, and the parabola just touches the x-axis." },
    ],
    relatedSlugs: ["matrix-calculator", "scientific-calculator", "statistics-calculator"],
  },
  {
    icon: Ship,
    name: "GCF & LCM Calculator",
    slug: "gcf-lcm-calculator",
    category: "math",
    description: "Calculate Greatest Common Factor and Least Common Multiple.",
    metaTitle: "GCF & LCM Calculator | Greatest Common Factor & LCM",
    metaDescription: "Free GCF and LCM calculator. Find greatest common factor and least common multiple of two numbers.",
    inputs: [
      { label: "Number 1", key: "num1", type: "number", placeholder: "e.g., 12", min: 1, defaultValue: 12 },
      { label: "Number 2", key: "num2", type: "number", placeholder: "e.g., 18", min: 1, defaultValue: 18 },
    ],
    compute: (inputs) => {
      const a = Number(inputs.num1), b = Number(inputs.num2);
      const gcd = (x: number, y: number): number => y ? gcd(y, x % y) : Math.abs(x);
      const g = gcd(a, b);
      return [
        { label: "GCF (GCD)", key: "gcf", value: g, color: "green" },
        { label: "LCM", key: "lcm", value: Math.abs(a*b)/g, color: "blue" },
        { label: "a x b", key: "prod", value: a*b, color: "default" },
        { label: "GCF x LCM", key: "check", value: g * (Math.abs(a*b)/g), color: "default" },
      ];
    },
    example: { inputs: { num1: 12, num2: 18 }, results: [] },
    faqs: [
      { question: "What is GCF?", answer: "The largest number that divides two or more numbers without remainder." },
      { question: "What is LCM?", answer: "The smallest positive number that is a multiple of two or more numbers." },
      { question: "How do you calculate GCF?", answer: "List the factors of each number and find the largest common factor, or use the Euclidean algorithm: divide the larger by the smaller repeatedly." },
      { question: "How do you calculate LCM?", answer: "LCM = (a x b) / GCF(a, b). Alternatively, list multiples of each number until you find the smallest common one." },
      { question: "What is the relationship between GCF and LCM?", answer: "For any two numbers, GCF x LCM = product of the two numbers. This relationship is useful for checking your calculations." },
      { question: "How are GCF and LCM used in fractions?", answer: "GCF helps simplify fractions by dividing numerator and denominator. LCM helps find a common denominator when adding fractions." },
      { question: "What is the Euclidean algorithm?", answer: "A method for finding GCF by repeatedly dividing: GCF(a, b) = GCF(b, a mod b) until b becomes zero. The last non-zero remainder is the GCF." },
      { question: "Can GCF and LCM be the same number?", answer: "Yes, when the two numbers are equal, the GCF and LCM are both equal to that number." },
    ],
    relatedSlugs: ["fraction-calculator", "prime-number-calculator", "statistics-calculator"],
    formula: "GCD(a, b) = GCD(b, a mod b)",
  },
  {
    icon: Hash,
    name: "Prime Number Calculator",
    slug: "prime-number-calculator",
    category: "math",
    description: "Check if a number is prime and find primes in a range.",
    metaTitle: "Prime Number Calculator | Check Primes & Find Primes in Range",
    metaDescription: "Free prime number calculator. Check if a number is prime, find primes in a range, and get prime factors.",
    inputs: [
      { label: "Number", key: "number", type: "number", placeholder: "e.g., 17", min: 1, defaultValue: 17 },
      { label: "Mode", key: "checkType", type: "radio", options: [
        { label: "Check if prime", value: "check" },
        { label: "Find primes up to", value: "range" },
      ], defaultValue: "check" },
    ],
    compute: (inputs) => {
      const n = Number(inputs.number);
      if (inputs.checkType === "check") {
        let prime = n > 1;
        for (let i = 2; i*i <= n && prime; i++) if (n % i === 0) prime = false;
        const factors: number[] = [];
        let t = n;
        for (let i = 2; i*i <= t; i++) { while (t % i === 0) { factors.push(i); t /= i; } }
        if (t > 1) factors.push(t);
        return [
          { label: "Result", key: "res", value: prime ? n + " is prime" : n + " is not prime", color: prime ? "green" : "red" },
          { label: "Prime Factors", key: "fac", value: factors.length ? factors.join(" x ") : "N/A", color: "default" },
        ];
      }
      const primes: number[] = [];
      for (let i = 2; i <= n; i++) {
        let p = true;
        for (let j = 2; j*j <= i && p; j++) if (i % j === 0) p = false;
        if (p) primes.push(i);
      }
      return [
        { label: "Count", key: "cnt", value: primes.length, unit: "primes up to " + n, color: "green" },
        { label: "Primes", key: "primes", value: primes.slice(0, 50).join(", ") + (primes.length > 50 ? "..." : ""), color: "blue" },
        { label: "Sum", key: "sum", value: primes.reduce((a,b) => a+b, 0), color: "default" },
      ];
    },
    example: { inputs: { number: 17, checkType: "check" }, results: [] },
    faqs: [
      { question: "What is a prime number?", answer: "A natural number > 1 with no positive divisors other than 1 and itself." },
      { question: "What is the smallest prime?", answer: "2 is the smallest prime and the only even prime number." },
      { question: "How can I check if a number is prime?", answer: "Check divisibility from 2 up to the square root of the number. If none divide evenly, the number is prime." },
      { question: "What are prime factors?", answer: "Prime factors are prime numbers that multiply together to give the original number. For example, the prime factors of 12 are 2 x 2 x 3." },
      { question: "Why is 1 not a prime number?", answer: "By definition, a prime number must have exactly two distinct positive divisors: 1 and itself. 1 has only one divisor, so it is excluded." },
      { question: "What is the Sieve of Eratosthenes?", answer: "An ancient algorithm for finding all primes up to a limit. It iteratively marks multiples of each prime starting from 2." },
      { question: "How many prime numbers are there?", answer: "There are infinitely many prime numbers, as proven by Euclid around 300 BCE. There are 25 primes under 100 and 168 under 1000." },
      { question: "What are twin primes?", answer: "Twin primes are pairs of primes that differ by 2, such as (3, 5), (11, 13), and (17, 19)." },
    ],
    relatedSlugs: ["gcf-lcm-calculator", "fraction-calculator", "statistics-calculator"],
    formula: "Check divisibility up to √n",
  },
  {
    icon: BarChart3,
    name: "Statistics Calculator",
    slug: "statistics-calculator",
    category: "math",
    description: "Calculate mean, median, mode, and standard deviation for a set of numbers.",
    metaTitle: "Statistics Calculator | Mean, Median, Mode, Standard Deviation",
    metaDescription: "Free statistics calculator to compute mean, median, mode, range, variance, and standard deviation.",
    inputs: [
      { label: "Numbers", key: "numbers", type: "number", placeholder: "Comma separated, e.g., 1,2,3,4,5", defaultValue: 1 },
    ],
    compute: (inputs) => {
      const nums = String(inputs.numbers).split(",").map(Number).filter(n => !isNaN(n));
      if (nums.length === 0) return [];
      const sorted = [...nums].sort((a,b) => a-b);
      const mean = Math.round(nums.reduce((a,b) => a+b, 0)/nums.length*100)/100;
      const mid = Math.floor(sorted.length/2);
      const median = sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid-1]+sorted[mid])/2*100)/100;
      const freq = new Map<number, number>();
      nums.forEach(v => freq.set(v, (freq.get(v)||0)+1));
      const maxFreq = Math.max(...freq.values());
      const modes = maxFreq > 1 ? [...freq.entries()].filter(([,c]) => c === maxFreq).map(([v]) => v).join(", ") : "None";
      const variance = Math.round(nums.reduce((a,b) => a + Math.pow(b-mean,2), 0)/nums.length*100)/100;
      const stdDev = Math.round(Math.sqrt(variance)*100)/100;
      return [
        { label: "Mean", key: "mean", value: mean, color: "blue" },
        { label: "Median", key: "median", value: median, color: "green" },
        { label: "Mode", key: "mode", value: modes, color: "amber" },
        { label: "Range", key: "range", value: Math.round((sorted[sorted.length-1] - sorted[0])*100)/100, color: "default" },
        { label: "Variance", key: "variance", value: variance, color: "default" },
        { label: "Standard Deviation", key: "stdDev", value: stdDev, color: "default" },
        { label: "Count", key: "count", value: nums.length, color: "default" },
        { label: "Sum", key: "sum", value: Math.round(nums.reduce((a,b) => a+b, 0)*100)/100, color: "default" },
      ];
    },
    example: { inputs: { numbers: "1,2,3,4,5" }, results: [] },
    faqs: [
      { question: "What is standard deviation?", answer: "A measure of how spread out numbers are from the mean. Lower values mean data is clustered around the mean." },
      { question: "What is the difference between mean and median?", answer: "Mean is the arithmetic average. Median is the middle value. Median is less affected by outliers." },
      { question: "What is the mode in statistics?", answer: "The mode is the value that appears most frequently in a dataset. A dataset may have one mode, multiple modes, or no mode if all values are unique." },
      { question: "What is variance?", answer: "Variance measures how far each value in the dataset is from the mean. It is the average of squared differences from the mean." },
      { question: "What is the range in statistics?", answer: "Range is the difference between the highest and lowest values in a dataset. It provides a simple measure of spread." },
      { question: "When should I use median instead of mean?", answer: "Use median when data has outliers or is skewed, like income data where a few high earners skew the mean upward." },
      { question: "What does a low standard deviation indicate?", answer: "A low standard deviation indicates that the data points tend to be close to the mean, showing consistency and low variability." },
      { question: "What is the difference between population and sample statistics?", answer: "Population includes all members of a group. Sample is a subset. Sample formulas use n-1 denominator for unbiased estimates." },
    ],
    relatedSlugs: ["percentage-calculator", "gcf-lcm-calculator", "prime-number-calculator"],
  },
  {
    icon: Clock,
    name: "Age Calculator",
    slug: "age-calculator",
    category: "time",
    description: "Calculate your exact age in years, months, days, and more. Choose any date to calculate age at that date.",
    metaTitle: "Age Calculator | Calculate Exact Age at Any Date",
    metaDescription: "Free online age calculator to find your exact age in years, months, days, hours, minutes, and seconds. Choose any date to calculate age at that date.",
    inputs: [
      { label: "Date of Birth", key: "birthDate", type: "date", defaultValue: "1995-01-15", required: true },
      { label: "Age at Date", key: "ageAtDate", type: "date", required: false },
    ],
    compute: (inputs) => {
      const b = new Date(inputs.birthDate as string);
      const t = inputs.ageAtDate ? new Date(inputs.ageAtDate as string) : new Date();
      let y = t.getFullYear() - b.getFullYear();
      let m = t.getMonth() - b.getMonth();
      let d = t.getDate() - b.getDate();
      if (d < 0) { m--; const pm = new Date(t.getFullYear(), t.getMonth(), 0); d += pm.getDate(); }
      if (m < 0) { y--; m += 12; }
      const totalDays = Math.floor((t.getTime()-b.getTime())/86400000);
      const totalHours = Math.floor((t.getTime()-b.getTime())/3600000);
      const totalMinutes = Math.floor((t.getTime()-b.getTime())/60000);
      const totalSeconds = Math.floor((t.getTime()-b.getTime())/1000);
      const weeks = Math.floor(totalDays / 7);
      const months = y * 12 + m;
      const nb = new Date(t.getFullYear(), b.getMonth(), b.getDate());
      if (nb <= t) nb.setFullYear(t.getFullYear()+1);
      const daysUntilNext = Math.floor((nb.getTime()-t.getTime())/86400000);
      return [
        { label: "Age", key: "age", value: y + " years, " + m + " months, " + d + " days", color: "green" },
        { label: "In Months", key: "inMonths", value: months + " months, " + d + " days", color: "blue" },
        { label: "In Weeks", key: "inWeeks", value: weeks + " weeks, " + (totalDays % 7) + " days", color: "blue" },
        { label: "In Days", key: "totalDays", value: totalDays, color: "default" },
        { label: "In Hours", key: "totalHours", value: totalHours, color: "default" },
        { label: "In Minutes", key: "totalMinutes", value: totalMinutes, color: "default" },
        { label: "In Seconds", key: "totalSeconds", value: totalSeconds, color: "default" },
        { label: "Next Birthday", key: "nextBday", value: nb.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), color: "amber" },
        { label: "Days Until Next Birthday", key: "daysUntilNext", value: daysUntilNext, color: "amber" },
      ];
    },
    chart: (results) => {
      const ageParts = String(results.find(r => r.key === "age")?.value).split(", ");
      const years = parseInt(ageParts[0]) || 0;
      const months = parseInt(ageParts[1]) || 0;
      const days = parseInt(ageParts[2]) || 0;
      return {
        type: "bar",
        data: {
          labels: ["Years", "Months", "Days"],
          datasets: [
            {
              label: "Age Breakdown",
              data: [years, months, days],
              backgroundColor: [
                "rgba(99, 102, 241, 0.8)",
                "rgba(6, 182, 212, 0.8)",
                "rgba(34, 197, 94, 0.8)",
              ],
              borderColor: [
                "rgba(99, 102, 241, 1)",
                "rgba(6, 182, 212, 1)",
                "rgba(34, 197, 94, 1)",
              ],
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        },
      };
    },
    example: { inputs: { birthDate: "1995-01-15", ageAtDate: "2026-06-16" }, results: [] },
    faqs: [
      { question: "How is age calculated?", answer: "By subtracting birth date from the target date, accounting for leap years, month lengths, and calendar complexities." },
      { question: "What is the 'Age at Date' field?", answer: "You can select any date to calculate how old you were at that specific date. Leave it empty to calculate age as of today." },
      { question: "Is the age exact?", answer: "Yes, it provides exact age in years, months, days, hours, minutes, and seconds." },
      { question: "How does leap year affect age calculation?", answer: "Leap years add an extra day on February 29. The calculator handles this automatically, ensuring age is accurate even for leap day birthdays." },
      { question: "How many days old am I?", answer: "The calculator shows your exact age in total days, which is the total number of days elapsed since your birth date." },
      { question: "What is chronological age vs biological age?", answer: "Chronological age is years since birth. Biological age estimates health and physical condition based on lifestyle and genetics." },
      { question: "Can I calculate age for someone who has passed away?", answer: "Yes, select a date of birth and a date after it to calculate how old they were at any point." },
      { question: "Why does age sometimes show different results on different calculators?", answer: "Some calculators count the current year as a full year. This calculator uses exact date subtraction for precision." },
    ],
    relatedSlugs: ["date-calculator", "time-duration-calculator", "heart-rate-calculator"],
  },
  {
    icon: CalendarDays,
    name: "Date Calculator",
    slug: "date-calculator",
    category: "time",
    description: "Add or subtract days, calculate date differences, find week numbers, and explore month details.",
    metaTitle: "Date Calculator | Add/Subtract Days, Date Difference, Week & Month Info",
    metaDescription: "Free online date calculator with 4 modes: add/subtract days, days between dates, week number, and month info. Plan events, track deadlines, and more.",
    inputs: [
      { label: "Mode", key: "mode", type: "radio", options: [
        { label: "Add/Subtract Days", value: "add" },
        { label: "Days Between", value: "diff" },
        { label: "Week Info", value: "week" },
        { label: "Month Info", value: "month" },
      ], defaultValue: "add" },
      { label: "Start Date", key: "startDate", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
      { label: "Days to Add/Subtract", key: "days", type: "number", placeholder: "e.g., 90", min: -10000, max: 10000, defaultValue: 90 },
      { label: "End Date", key: "endDate", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
      { label: "Target Date", key: "targetDate", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
    ],
    compute: (inputs) => {
      const mode = inputs.mode as string;
      const dw = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

      if (mode === "add") {
        const d = new Date(inputs.startDate as string);
        const days = Number(inputs.days);
        d.setDate(d.getDate() + days);
        return [
          { label: "Result Date", key: "resultDate", value: d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), color: "green" },
          { label: "Day of Week", key: "dayOfWeek", value: dw[d.getDay()], color: "blue" },
          { label: "Days " + (days >= 0 ? "Added" : "Subtracted"), key: "daysChanged", value: Math.abs(days), color: "default" },
        ];
      }

      if (mode === "diff") {
        const d1 = new Date(inputs.startDate as string);
        const d2 = new Date(inputs.endDate as string);
        const diff = Math.abs(d2.getTime()-d1.getTime());
        const total = Math.floor(diff/86400000);
        let wd = 0, we = 0;
        const s = new Date(Math.min(d1.getTime(), d2.getTime()));
        const e = new Date(Math.max(d1.getTime(), d2.getTime()));
        for (let d = new Date(s); d <= e; d.setDate(d.getDate()+1)) {
          const day = d.getDay();
          if (day === 0 || day === 6) we++; else wd++;
        }
        return [
          { label: "Total Days", key: "totalDays", value: total, color: "green" },
          { label: "Weekdays", key: "weekdays", value: wd, color: "blue" },
          { label: "Weekends", key: "weekends", value: we, color: "amber" },
          { label: "Weeks", key: "weeks", value: Math.floor(total/7), color: "default" },
          { label: "Months (approx)", key: "months", value: Math.floor(total/30.44), color: "default" },
          { label: "Years (approx)", key: "years", value: Math.floor(total/365.25), color: "default" },
        ];
      }

      if (mode === "week") {
        const d = new Date(inputs.targetDate as string);
        const soy = new Date(d.getFullYear(), 0, 1);
        const doy = Math.floor((d.getTime()-soy.getTime())/86400000)+1;
        const wn = Math.ceil(doy/7);
        const dotw = d.getDay();
        const mo = dotw === 0 ? -6 : 1-dotw;
        const ws = new Date(d); ws.setDate(d.getDate()+mo);
        const we = new Date(ws); we.setDate(ws.getDate()+6);
        return [
          { label: "Week Number", key: "weekNumber", value: wn, color: "green" },
          { label: "Year", key: "year", value: d.getFullYear(), color: "default" },
          { label: "Week Start", key: "weekStart", value: ws.toLocaleDateString("en-US", { month: "long", day: "numeric" }), color: "blue" },
          { label: "Week End", key: "weekEnd", value: we.toLocaleDateString("en-US", { month: "long", day: "numeric" }), color: "blue" },
          { label: "Day of Year", key: "dayOfYear", value: doy, color: "default" },
          { label: "Month", key: "month", value: d.getMonth()+1, color: "default" },
        ];
      }

      if (mode === "month") {
        const d1 = new Date(inputs.startDate as string);
        const d2 = new Date(inputs.endDate as string);
        const months = (d2.getFullYear()-d1.getFullYear())*12 + (d2.getMonth()-d1.getMonth());
        const days = Math.floor(Math.abs(d2.getTime()-d1.getTime())/86400000);
        const fd = new Date(d1.getFullYear(), d1.getMonth(), 1);
        const ld = new Date(d1.getFullYear(), d1.getMonth()+1, 0);
        return [
          { label: "Total Months", key: "totalMonths", value: Math.abs(months), color: "green" },
          { label: "Total Days", key: "totalDays", value: days, color: "blue" },
          { label: "First Day of Month", key: "firstDay", value: fd.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), color: "default" },
          { label: "Last Day of Month", key: "lastDay", value: ld.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), color: "default" },
          { label: "Days in Month", key: "daysInMonth", value: ld.getDate(), color: "default" },
        ];
      }

      return [];
    },
    example: { inputs: { mode: "add", startDate: "2026-01-01", days: 90, endDate: "2026-06-15", targetDate: "2026-06-15" }, results: [] },
    faqs: [
      { question: "What can I use the date calculator for?", answer: "Plan events, calculate project deadlines, determine warranty expiry, schedule appointments, and track date differences." },
      { question: "Can I subtract days?", answer: "Yes, in Add/Subtract mode use a negative number to go backwards from the start date." },
      { question: "Does it account for leap years?", answer: "Yes, the JavaScript Date object handles all calendar edge cases including leap years." },
      { question: "How are weekdays counted in Days Between mode?", answer: "Monday through Friday are weekdays. Saturday and Sunday are weekends. The calculator iterates through each day to count them." },
      { question: "What week numbering system is used in Week Info mode?", answer: "Simple week numbering where week 1 starts January 1. The week starts on Monday." },
      { question: "How are months counted in Month Info mode?", answer: "Month difference is calculated as complete calendar months between the two dates by comparing year and month differences." },
      { question: "How many days are in each month?", answer: "January 31, February 28 (29 in leap years), March 31, April 30, May 31, June 30, July 31, August 31, September 30, October 31, November 30, December 31." },
      { question: "Can I calculate days until a specific event?", answer: "Yes, use Days Between mode with today as Start Date and your event date as End Date to see exactly how many days remain." },
    ],
    relatedSlugs: ["age-calculator", "time-duration-calculator", "percentage-calculator"],
  },
  {
    icon: CalendarDays,
    name: "Days Between Dates",
    slug: "days-between-dates",
    category: "time",
    description: "Calculate the exact number of days between two dates.",
    metaTitle: "Days Between Dates | Date Difference Calculator",
    metaDescription: "Free online calculator to find the number of days, weeks, months, and years between two dates.",
    inputs: [
      { label: "Start Date", key: "date1", type: "date", defaultValue: "2026-01-01" },
      { label: "End Date", key: "date2", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
    ],
    compute: (inputs) => {
      const d1 = new Date(inputs.date1 as string);
      const d2 = new Date(inputs.date2 as string);
      const diff = Math.abs(d2.getTime()-d1.getTime());
      const total = Math.floor(diff/86400000);
      let wd = 0, we = 0;
      const s = new Date(Math.min(d1.getTime(), d2.getTime()));
      const e = new Date(Math.max(d1.getTime(), d2.getTime()));
      for (let d = new Date(s); d <= e; d.setDate(d.getDate()+1)) {
        const day = d.getDay();
        if (day === 0 || day === 6) we++; else wd++;
      }
      return [
        { label: "Total Days", key: "totalDays", value: total, color: "green" },
        { label: "Weekdays", key: "weekdays", value: wd, color: "blue" },
        { label: "Weekends", key: "weekends", value: we, color: "amber" },
        { label: "Weeks", key: "weeks", value: Math.floor(total/7), color: "default" },
        { label: "Months (approx)", key: "months", value: Math.floor(total/30.44), color: "default" },
        { label: "Years (approx)", key: "years", value: Math.floor(total/365.25), color: "default" },
      ];
    },
    example: { inputs: { date1: "2026-01-01", date2: "2026-06-15" }, results: [] },
    faqs: [
      { question: "Does this count both start and end dates?", answer: "It calculates the full range including both dates." },
      { question: "How are weekdays counted?", answer: "Monday through Friday are weekdays. Saturday and Sunday are weekends." },
      { question: "How many weekdays are between two dates?", answer: "The calculator shows the count of weekdays by iterating through each day and counting Monday through Friday." },
      { question: "How can I calculate business days excluding holidays?", answer: "This calculator counts all weekdays. To exclude holidays, you would need to manually subtract specific holiday dates." },
      { question: "What is the approximate months value?", answer: "Months are approximated by dividing total days by 30.44, the average number of days in a month. Actual months vary by calendar." },
      { question: "How is the date difference useful in projects?", answer: "Project managers use date differences to track timelines, set milestones, calculate sprint durations, and manage deadlines." },
      { question: "Why does the number of months not match calendar months?", answer: "Calendar months vary in length (28-31 days). The calculator uses an average for the months approximation." },
      { question: "Can I calculate days until a specific event?", answer: "Yes, set the start date as today and the end date as your event date to see exactly how many days remain." },
    ],
    relatedSlugs: ["age-calculator", "date-calculator", "time-duration-calculator"],
  },
  {
    icon: Timer,
    name: "Time Duration Calculator",
    slug: "time-duration-calculator",
    category: "time",
    description: "Calculate the duration between two times.",
    metaTitle: "Time Duration Calculator | Hours Between Times Calculator",
    metaDescription: "Free time duration calculator to find hours and minutes between two times. Calculate work hours, shift durations, and more.",
    inputs: [
      { label: "Start Time", key: "startTime", type: "time", defaultValue: "09:00" },
      { label: "End Time", key: "endTime", type: "time", defaultValue: "17:00" },
    ],
    compute: (inputs) => {
      const [sh, sm] = (inputs.startTime as string).split(":").map(Number);
      const [eh, em] = (inputs.endTime as string).split(":").map(Number);
      let diff = (eh*60+em) - (sh*60+sm);
      if (diff < 0) diff += 1440;
      return [
        { label: "Duration", key: "duration", value: Math.floor(diff/60) + "h " + (diff%60) + "m", color: "green" },
        { label: "Total Hours", key: "hours", value: Math.floor(diff/60), unit: "hours", color: "blue" },
        { label: "Total Minutes", key: "minutes", value: diff, unit: "min", color: "default" },
        { label: "In Decimal", key: "decimal", value: Math.round(diff/60*100)/100, unit: "hours", color: "default" },
      ];
    },
    example: { inputs: { startTime: "09:00", endTime: "17:00" }, results: [] },
    faqs: [
      { question: "Does it handle overnight shifts?", answer: "Yes, if end time is earlier than start time, it assumes the end time is the next day." },
      { question: "Can I calculate lunch breaks?", answer: "The calculator gives total duration. Subtract break time separately for net work hours." },
      { question: "How do I calculate the duration between two times?", answer: "Subtract the start time from the end time. If the end is earlier, add 24 hours to account for crossing midnight." },
      { question: "What is the decimal hours format used for?", answer: "Decimal hours (e.g., 8.5 hours) are commonly used for payroll, timesheets, and billing where fractional hours need to be totaled." },
      { question: "Can I calculate time durations across multiple days?", answer: "For multi-day durations, use the date calculator or days between dates tool instead of this time-only calculator." },
      { question: "How do I convert minutes to decimal hours?", answer: "Divide the minutes by 60. For example, 8 hours and 30 minutes = 8.5 decimal hours." },
      { question: "What is military time format?", answer: "Military time uses a 24-hour clock where 1:00 PM is 13:00, 6:00 PM is 18:00, etc. This calculator uses 12-hour format but accepts both." },
      { question: "How do I add multiple time durations together?", answer: "Convert each duration to total minutes, add them up, then convert back to hours and minutes." },
    ],
    relatedSlugs: ["date-calculator", "age-calculator", "percentage-calculator"],
  },
  {
    icon: CalendarDays,
    name: "Week Calculator",
    slug: "week-calculator",
    category: "time",
    description: "Calculate week number, start/end of week, and day of year.",
    metaTitle: "Week Calculator | Week Number & Start/End of Week Calculator",
    metaDescription: "Free week calculator to find the week number, start and end dates of the week, and day of the year.",
    inputs: [
      { label: "Date", key: "date", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
    ],
    compute: (inputs) => {
      const d = new Date(inputs.date as string);
      const soy = new Date(d.getFullYear(), 0, 1);
      const doy = Math.floor((d.getTime()-soy.getTime())/86400000)+1;
      const wn = Math.ceil(doy/7);
      const dotw = d.getDay();
      const mo = dotw === 0 ? -6 : 1-dotw;
      const ws = new Date(d); ws.setDate(d.getDate()+mo);
      const we = new Date(ws); we.setDate(ws.getDate()+6);
      return [
        { label: "Week Number", key: "weekNumber", value: wn, color: "green" },
        { label: "Year", key: "year", value: d.getFullYear(), color: "default" },
        { label: "Week Start", key: "weekStart", value: ws.toLocaleDateString("en-US", { month: "long", day: "numeric" }), color: "blue" },
        { label: "Week End", key: "weekEnd", value: we.toLocaleDateString("en-US", { month: "long", day: "numeric" }), color: "blue" },
        { label: "Day of Year", key: "dayOfYear", value: doy, color: "default" },
        { label: "Month", key: "month", value: d.getMonth()+1, color: "default" },
      ];
    },
    example: { inputs: { date: new Date().toISOString().split("T")[0] }, results: [] },
    faqs: [
      { question: "What week numbering system is used?", answer: "Simple week numbering where week 1 starts January 1. Week starts on Monday." },
      { question: "What is day of year?", answer: "The sequential day number from 1 (Jan 1) to 365 or 366 (Dec 31)." },
      { question: "What is the ISO week date system?", answer: "ISO 8601 defines week numbers where week 1 is the week containing the first Thursday of the year. Weeks start on Monday." },
      { question: "How many weeks are in a year?", answer: "A common year has 52 weeks plus 1 day (52.14 weeks). A leap year has 52 weeks plus 2 days (52.29 weeks)." },
      { question: "What is the difference between week start on Monday vs Sunday?", answer: "In some countries, the week starts on Monday (ISO). In others like the US, the week starts on Sunday. This calculator uses Monday." },
      { question: "How do I know which week of the month it is?", answer: "Divide the day of the month by 7 and round up. For example, the 15th is in week 3 of the month." },
      { question: "What can I use week numbers for?", answer: "Week numbers are useful for project planning, manufacturing schedules, school terms, and fiscal reporting periods." },
      { question: "Does every year have week 53?", answer: "Some years have 53 weeks depending on the numbering system. In the ISO system, years starting or ending on a Thursday have 53 weeks." },
    ],
    relatedSlugs: ["date-calculator", "age-calculator", "time-duration-calculator"],
  },
  {
    icon: Timer,
    name: "Month Calculator",
    slug: "month-calculator",
    category: "time",
    description: "Calculate month difference, calendar view, and month boundaries.",
    metaTitle: "Month Calculator | Month Difference & Calendar Calculator",
    metaDescription: "Free month calculator to find the number of months between dates and view a monthly calendar.",
    inputs: [
      { label: "Start Date", key: "date1", type: "date", defaultValue: "2026-01-01" },
      { label: "End Date", key: "date2", type: "date", defaultValue: new Date().toISOString().split("T")[0] },
    ],
    compute: (inputs) => {
      const d1 = new Date(inputs.date1 as string);
      const d2 = new Date(inputs.date2 as string);
      const months = (d2.getFullYear()-d1.getFullYear())*12 + (d2.getMonth()-d1.getMonth());
      const days = Math.floor(Math.abs(d2.getTime()-d1.getTime())/86400000);
      const fd = new Date(d1.getFullYear(), d1.getMonth(), 1);
      const ld = new Date(d1.getFullYear(), d1.getMonth()+1, 0);
      return [
        { label: "Total Months", key: "totalMonths", value: Math.abs(months), color: "green" },
        { label: "Total Days", key: "totalDays", value: days, color: "blue" },
        { label: "First Day of Month", key: "firstDay", value: fd.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), color: "default" },
        { label: "Last Day of Month", key: "lastDay", value: ld.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }), color: "default" },
        { label: "Days in Month", key: "daysInMonth", value: ld.getDate(), color: "default" },
      ];
    },
    example: { inputs: { date1: "2026-01-01", date2: "2026-06-15" }, results: [] },
    faqs: [
      { question: "How are months counted?", answer: "Month difference is calculated as complete calendar months between the two dates." },
      { question: "What is shown in the calendar view?", answer: "The first and last day of the month, along with the total number of days." },
      { question: "How many months are between two dates?", answer: "The calculator counts full calendar months by comparing year and month differences, ignoring extra days." },
      { question: "What is the first day of the month?", answer: "The first day is always the 1st of the month. The day of the week varies each month and year." },
      { question: "How many days are in each month?", answer: "January has 31, February has 28 (29 in leap years), March 31, April 30, May 31, June 30, July 31, August 31, September 30, October 31, November 30, December 31." },
      { question: "What is a leap year?", answer: "A leap year occurs every 4 years when February has 29 days. Years divisible by 100 are not leap years unless also divisible by 400." },
      { question: "How do months help with financial planning?", answer: "Monthly intervals are used for loan EMIs, rent payments, salary cycles, utility bills, and subscription services." },
      { question: "How do I calculate the exact month difference for a rental agreement?", answer: "The calculator provides calendar months. For rental agreements, count the first day of each month to month for standard terms." },
    ],
    relatedSlugs: ["date-calculator", "age-calculator", "time-duration-calculator"],
  },
 
  {
    icon: Zap,
    name: "Ohms Law Calculator",
    slug: "ohms-law-calculator",
    category: "engineering",
    description: "Calculate voltage, current, or resistance using Ohms Law.",
    metaTitle: "Ohms Law Calculator | Calculate V=IR Online",
    metaDescription: "Free Ohms Law calculator to calculate voltage, current, and resistance. Enter any two values to find the third using V = IR.",
    inputs: [
      { label: "Voltage (V)", key: "voltage", type: "number", placeholder: "Leave blank to calculate", step: 0.1 },
      { label: "Current (I)", key: "current", type: "number", placeholder: "Leave blank to calculate", step: 0.01 },
      { label: "Resistance (R)", key: "resistance", type: "number", placeholder: "Leave blank to calculate", step: 0.1 },
    ],
    compute: (inputs) => {
      const v = inputs.voltage !== "" ? Number(inputs.voltage) : null;
      const i = inputs.current !== "" ? Number(inputs.current) : null;
      const r = inputs.resistance !== "" ? Number(inputs.resistance) : null;
      const filled = [v, i, r].filter(x => x !== null).length;
      if (filled < 2) return [{ label: "Status", key: "status", value: "Enter at least two values", color: "amber" }];
      let V = v, I = i, R = r;
      if (V === null && I !== null && R !== null) V = I * R;
      if (I === null && V !== null && R !== null) I = V / R;
      if (R === null && V !== null && I !== null) R = V / I;
      return [
        { label: "Voltage", key: "voltage", value: Math.round((V ?? 0)*100)/100, unit: "V", color: "red" },
        { label: "Current", key: "current", value: Math.round((I ?? 0)*10000)/10000, unit: "A", color: "blue" },
        { label: "Resistance", key: "resistance", value: Math.round((R ?? 0)*100)/100, unit: "Ohm", color: "green" },
        { label: "Power", key: "power", value: Math.round(((V ?? 0)*(I ?? 0))*100)/100, unit: "W", color: "default" },
      ];
    },
    example: { inputs: { voltage: "12", current: "2", resistance: "" }, results: [] },
    faqs: [
      { question: "What is Ohms Law?", answer: "V = IR states that voltage equals current multiplied by resistance." },
      { question: "How do I use this calculator?", answer: "Enter any two values (voltage, current, or resistance) and the third will be calculated automatically." },
      { question: "What units does Ohms Law use?", answer: "Voltage is measured in volts (V), current in amperes (A), and resistance in ohms (Ohm). Ensure consistent units when calculating." },
      { question: "What is the Ohms Law triangle?", answer: "The triangle shows: V at top, I and R at bottom. Cover the variable you want to find: V = I x R, I = V / R, R = V / I." },
      { question: "How do I calculate power using Ohms Law?", answer: "Power (watts) can be calculated as P = V x I, or P = I^2 x R, or P = V^2 / R, depending on which values you know." },
      { question: "What happens to current if resistance increases?", answer: "For a fixed voltage, increasing resistance decreases current proportionally, as described by I = V / R." },
      { question: "Can Ohms Law be applied to AC circuits?", answer: "Yes, but for AC circuits with reactive components, impedance (Z) replaces resistance, and the relationship includes phase angles." },
      { question: "What is an example of Ohms Law in daily life?", answer: "A 12V car headlight drawing 2A has resistance of 6 Ohms (R = 12 / 2). This helps choose the correct fuse rating." },
    ],
    relatedSlugs: ["power-calculator", "voltage-divider-calculator", "resistor-calculator"],
    formula: "V = I × R,  I = V / R,  R = V / I",
  },
  {
    icon: Zap,
    name: "Voltage Divider Calculator",
    slug: "voltage-divider-calculator",
    category: "engineering",
    description: "Calculate output voltage for a voltage divider circuit.",
    metaTitle: "Voltage Divider Calculator | Calculate Vout Online",
    metaDescription: "Free voltage divider calculator to find the output voltage and resistor ratio for a given input voltage and resistor pair.",
    inputs: [
      { label: "Input Voltage (Vin)", key: "vin", type: "number", placeholder: "e.g., 5", step: 0.1, defaultValue: 5 },
      { label: "Resistor R1 (Ohm)", key: "r1", type: "number", placeholder: "e.g., 1000", step: 1, defaultValue: 1000 },
      { label: "Resistor R2 (Ohm)", key: "r2", type: "number", placeholder: "e.g., 2000", step: 1, defaultValue: 2000 },
    ],
    compute: (inputs) => {
      const vin = Number(inputs.vin);
      const r1 = Number(inputs.r1);
      const r2 = Number(inputs.r2);
      const vout = Math.round(vin * r2 / (r1 + r2) * 1000) / 1000;
      const ratio = Math.round(r2 / (r1 + r2) * 10000) / 10000;
      return [
        { label: "Output Voltage", key: "vout", value: vout, unit: "V", color: "green" },
        { label: "Ratio", key: "ratio", value: ratio, color: "blue" },
        { label: "Ratio %", key: "ratioPct", value: Math.round(ratio*10000)/100, unit: "%", color: "default" },
        { label: "Total Resistance", key: "totalR", value: r1 + r2, unit: "Ohm", color: "default" },
      ];
    },
    example: { inputs: { vin: 5, r1: 1000, r2: 2000 }, results: [] },
    faqs: [
      { question: "What is a voltage divider?", answer: "A simple circuit that produces an output voltage as a fraction of the input using two resistors in series." },
      { question: "How do I choose resistor values?", answer: "Choose R1 and R2 based on the desired output voltage ratio. Higher values use less power but may be less accurate." },
      { question: "What is the voltage divider formula?", answer: "Vout = Vin x R2 / (R1 + R2). The output voltage is the input voltage multiplied by the ratio of R2 to total resistance." },
      { question: "What are common applications of voltage dividers?", answer: "They are used in sensor circuits, volume controls, reference voltage generation, level shifting, and biasing transistors." },
      { question: "How does load resistance affect a voltage divider?", answer: "Connecting a load across R2 reduces the effective resistance, lowering the output voltage. This is called the loading effect." },
      { question: "What is the difference between potentiometer and voltage divider?", answer: "A potentiometer is a variable voltage divider in a single component. A voltage divider typically uses fixed resistors for a specific ratio." },
      { question: "How do I calculate power dissipation in a voltage divider?", answer: "Power = V^2 / R for each resistor. Sum the power of both resistors to find total power dissipated by the divider." },
      { question: "What resistor values should I avoid in a voltage divider?", answer: "Avoid very low values that draw excessive current and waste power, or very high values that are susceptible to noise and loading effects." },
    ],
    relatedSlugs: ["ohms-law-calculator", "power-calculator", "resistor-calculator"],
  },
  {
    icon: Zap,
    name: "Power Calculator",
    slug: "power-calculator",
    category: "engineering",
    description: "Calculate watts, volts, amps, and ohms using the power wheel. Enter any two values to find the missing ones.",
    metaTitle: "Power & Watt Calculator | Calculate Watts, Volts, Amps, Ohms",
    metaDescription: "Free power and watt calculator using P=VI, P=I^2R, P=V^2/R formulas. Calculate watts, volts, amps, or ohms — enter any two values.",
    inputs: [
      { label: "Power (W)", key: "power", type: "number", placeholder: "Leave blank", step: 0.1 },
      { label: "Voltage (V)", key: "voltage", type: "number", placeholder: "Leave blank", step: 0.1 },
      { label: "Current (I)", key: "current", type: "number", placeholder: "Leave blank", step: 0.01 },
      { label: "Resistance (R)", key: "resistance", type: "number", placeholder: "Leave blank", step: 0.1 },
    ],
    compute: (inputs) => {
      const p = inputs.power !== "" ? Number(inputs.power) : null;
      const v = inputs.voltage !== "" ? Number(inputs.voltage) : null;
      const i = inputs.current !== "" ? Number(inputs.current) : null;
      const r = inputs.resistance !== "" ? Number(inputs.resistance) : null;
      const filled = [p, v, i, r].filter(x => x !== null).length;
      if (filled < 2) return [{ label: "Status", key: "status", value: "Enter at least two values", color: "amber" }];
      let P = p, V = v, I = i, R = r;
      if (P === null && V !== null && I !== null) P = V * I;
      else if (P === null && I !== null && R !== null) P = I*I * R;
      else if (P === null && V !== null && R !== null) P = V*V / R;
      if (V === null && P !== null && I !== null) V = P / I;
      else if (V === null && P !== null && R !== null) V = Math.sqrt(P * R);
      else if (V === null && I !== null && R !== null) V = I * R;
      if (I === null && P !== null && V !== null) I = P / V;
      else if (I === null && P !== null && R !== null) I = Math.sqrt(P / R);
      else if (I === null && V !== null && R !== null) I = V / R;
      if (R === null && V !== null && I !== null) R = V / I;
      else if (R === null && P !== null && I !== null) R = P / (I*I);
      else if (R === null && V !== null && P !== null) R = V*V / P;
      return [
        { label: "Power", key: "power", value: Math.round((P ?? 0)*100)/100, unit: "W", color: "green" },
        { label: "Voltage", key: "voltage", value: Math.round((V ?? 0)*100)/100, unit: "V", color: "red" },
        { label: "Current", key: "current", value: Math.round((I ?? 0)*10000)/10000, unit: "A", color: "blue" },
        { label: "Resistance", key: "resistance", value: Math.round((R ?? 0)*100)/100, unit: "Ohm", color: "amber" },
      ];
    },
    example: { inputs: { power: "", voltage: "12", current: "2", resistance: "" }, results: [] },
    faqs: [
      { question: "What is a watt?", answer: "A watt (W) measures power — the rate of energy transfer. 1 watt = 1 volt × 1 ampere = 1 joule per second." },
      { question: "How do I calculate watts from volts and amps?", answer: "Watts = Volts × Amps. For example, a 120V device drawing 1.5A consumes 180W." },
      { question: "What are the three power formulas?", answer: "P = V×I (volts × amps), P = I²×R (amps² × ohms), and P = V²/R (volts² ÷ ohms). All three are equivalent." },
      { question: "What is the power wheel?", answer: "The power wheel (or Ohm's law wheel) shows 12 formulas relating power (P), voltage (V), current (I), and resistance (R) in a circle." },
      { question: "How do I convert watts to horsepower?", answer: "1 horsepower = 746 watts. Divide watts by 746 to get horsepower. Used for motors and engine ratings." },
      { question: "What is the difference between AC and DC power?", answer: "DC power is constant voltage × current. AC power has real power (watts) and reactive power (VARs) due to phase differences." },
      { question: "How does resistance affect power dissipation?", answer: "Higher resistance increases power dissipation at a given current (P = I²R), but decreases power at a given voltage (P = V²/R)." },
      { question: "What is a kilowatt-hour?", answer: "A kilowatt-hour (kWh) is 1,000 watts used for 1 hour — the standard unit for electricity billing." },
    ],
    relatedSlugs: ["ohms-law-calculator", "voltage-divider-calculator", "resistor-calculator"],
    formula: "P = V × I = I² × R = V² / R",
  },
  {
    icon: CircuitBoard,
    name: "Resistor Calculator",
    slug: "resistor-calculator",
    category: "engineering",
    description: "Calculate resistance value from resistor color bands.",
    metaTitle: "Resistor Calculator | Resistor Color Code Calculator",
    metaDescription: "Free resistor color code calculator to determine resistance from 4-band color codes and find the nearest standard value.",
    inputs: [
      { label: "Band 1 (First Digit)", key: "band1", type: "select", options: [
        { label: "Black (0)", value: "black" }, { label: "Brown (1)", value: "brown" },
        { label: "Red (2)", value: "red" }, { label: "Orange (3)", value: "orange" },
        { label: "Yellow (4)", value: "yellow" }, { label: "Green (5)", value: "green" },
        { label: "Blue (6)", value: "blue" }, { label: "Violet (7)", value: "violet" },
        { label: "Grey (8)", value: "grey" }, { label: "White (9)", value: "white" },
      ], defaultValue: "brown" },
      { label: "Band 2 (Second Digit)", key: "band2", type: "select", options: [
        { label: "Black (0)", value: "black" }, { label: "Brown (1)", value: "brown" },
        { label: "Red (2)", value: "red" }, { label: "Orange (3)", value: "orange" },
        { label: "Yellow (4)", value: "yellow" }, { label: "Green (5)", value: "green" },
        { label: "Blue (6)", value: "blue" }, { label: "Violet (7)", value: "violet" },
        { label: "Grey (8)", value: "grey" }, { label: "White (9)", value: "white" },
      ], defaultValue: "black" },
      { label: "Multiplier", key: "multiplier", type: "select", options: [
        { label: "Black (x1)", value: "black" }, { label: "Brown (x10)", value: "brown" },
        { label: "Red (x100)", value: "red" }, { label: "Orange (x1K)", value: "orange" },
        { label: "Yellow (x10K)", value: "yellow" }, { label: "Green (x100K)", value: "green" },
        { label: "Blue (x1M)", value: "blue" }, { label: "Gold (x0.1)", value: "gold" },
        { label: "Silver (x0.01)", value: "silver" },
      ], defaultValue: "red" },
      { label: "Tolerance", key: "tolerance", type: "select", options: [
        { label: "Brown (1%)", value: "brown" }, { label: "Red (2%)", value: "red" },
        { label: "Gold (5%)", value: "gold" }, { label: "Silver (10%)", value: "silver" },
      ], defaultValue: "gold" },
    ],
    compute: (inputs) => {
      const colors: Record<string, number> = { black: 0, brown: 1, red: 2, orange: 3, yellow: 4, green: 5, blue: 6, violet: 7, grey: 8, white: 9 };
      const mult: Record<string, number> = { black: 1, brown: 10, red: 100, orange: 1000, yellow: 10000, green: 100000, blue: 1000000, gold: 0.1, silver: 0.01 };
      const tolMap: Record<string, number> = { brown: 1, red: 2, gold: 5, silver: 10 };
      const b1 = inputs.band1 as string, b2 = inputs.band2 as string, m = inputs.multiplier as string, t = inputs.tolerance as string;
      const val = (colors[b1]*10 + colors[b2]) * (mult[m]??1);
      const tol = tolMap[t] ?? 20;
      let fmt: string;
      if (val >= 1000000) fmt = Math.round(val/1000000*100)/100 + " M";
      else if (val >= 1000) fmt = Math.round(val/1000*100)/100 + " k";
      else fmt = val + " ";
      return [
        { label: "Resistance", key: "resistance", value: fmt + "Ohm", color: "green" },
        { label: "Tolerance", key: "tolerance", value: "+/- " + tol + "%", color: "amber" },
        { label: "Value", key: "value", value: val, unit: "Ohm", color: "default" },
        { label: "Range", key: "range", value: Math.round(val*(1-tol/100)) + " - " + Math.round(val*(1+tol/100)) + " Ohm", color: "default" },
      ];
    },
    example: { inputs: { band1: "brown", band2: "black", multiplier: "red", tolerance: "gold" }, results: [] },
    faqs: [
      { question: "How to read resistor color bands?", answer: "First two bands are digits, third is multiplier (number of zeros), fourth is tolerance." },
      { question: "What does the tolerance mean?", answer: "Tolerance indicates how much the actual resistance can vary from the stated value. 5% gold is common." },
      { question: "What are the standard resistor values?", answer: "E12 series values: 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82 and their multiples. E24 offers more precision." },
      { question: "How do I calculate resistor color bands in reverse?", answer: "To find colors for a desired value, determine the first two digits, then count the zeros needed as the multiplier band." },
      { question: "What is a 4-band vs 5-band resistor?", answer: "4-band resistors have 2 digits, 1 multiplier, 1 tolerance. 5-band resistors have 3 digits for higher precision." },
      { question: "What does the multiplier band do?", answer: "The multiplier band tells you how many zeros to add after the digits. For example, red multiplier (x100) adds two zeros." },
      { question: "Why are gold and silver used for tolerance?", answer: "Gold indicates 5% tolerance, silver indicates 10%. These are the most common tolerances for general-purpose resistors." },
      { question: "How do I choose between different resistor tolerances?", answer: "Use 5% for general circuits, 1% for precision applications like voltage dividers, and 10% for non-critical uses like LED current limiting." },
    ],
    relatedSlugs: ["ohms-law-calculator", "power-calculator", "watt-calculator"],
  },
  {
    icon: Gauge,
    name: "Watt Calculator",
    slug: "watt-calculator",
    category: "engineering",
    description: "Calculate watts, volts, amps, or ohms using the power wheel.",
    metaTitle: "Watt Calculator | Calculate Watts, Volts, Amps, Ohms",
    metaDescription: "Free watt calculator to convert between watts, volts, amps, and ohms using Ohms Law and the power formula.",
    inputs: [
      { label: "Power (W)", key: "powerW", type: "number", placeholder: "Leave blank", step: 0.1 },
      { label: "Voltage (V)", key: "voltageV", type: "number", placeholder: "Leave blank", step: 0.1 },
      { label: "Current (A)", key: "currentA", type: "number", placeholder: "Leave blank", step: 0.01 },
      { label: "Resistance (Ohm)", key: "resistanceR", type: "number", placeholder: "Leave blank", step: 0.1 },
    ],
    compute: (inputs) => {
      const p = inputs.powerW !== "" ? Number(inputs.powerW) : null;
      const v = inputs.voltageV !== "" ? Number(inputs.voltageV) : null;
      const i = inputs.currentA !== "" ? Number(inputs.currentA) : null;
      const r = inputs.resistanceR !== "" ? Number(inputs.resistanceR) : null;
      if ([p,v,i,r].filter(x => x !== null).length < 2)
        return [{ label: "Status", key: "status", value: "Enter at least two values", color: "amber" }];
      let P=p, V=v, I=i, R=r;
      if (P===null) { if (V!==null&&I!==null) P=V*I; else if (I!==null&&R!==null) P=I*I*R; else if (V!==null&&R!==null) P=V*V/R; }
      if (V===null) { if (P!==null&&I!==null) V=P/I; else if (P!==null&&R!==null) V=Math.sqrt(P*R); else if (I!==null&&R!==null) V=I*R; }
      if (I===null) { if (P!==null&&V!==null) I=P/V; else if (P!==null&&R!==null) I=Math.sqrt(P/R); else if (V!==null&&R!==null) I=V/R; }
      if (R===null) { if (V!==null&&I!==null) R=V/I; else if (P!==null&&I!==null) R=P/(I*I); else if (V!==null&&P!==null) R=V*V/P; }
      return [
        { label: "Power", key: "power", value: Math.round((P??0)*100)/100, unit: "W", color: "green" },
        { label: "Voltage", key: "voltage", value: Math.round((V??0)*100)/100, unit: "V", color: "red" },
        { label: "Current", key: "current", value: Math.round((I??0)*10000)/10000, unit: "A", color: "blue" },
        { label: "Resistance", key: "resistance", value: Math.round((R??0)*100)/100, unit: "Ohm", color: "amber" },
      ];
    },
    example: { inputs: { powerW: "60", voltageV: "120", currentA: "", resistanceR: "" }, results: [] },
    faqs: [
      { question: "What is a watt?", answer: "A watt measures power. 1 watt = 1 volt x 1 ampere." },
      { question: "How do I calculate watts?", answer: "Watts = Volts x Amps. Alternatively, Watts = Amps^2 x Ohms or Watts = Volts^2 / Ohms." },
      { question: "What is the power wheel in electronics?", answer: "The power wheel shows the relationships between power (P), voltage (V), current (I), and resistance (R), with 12 formulas arranged in a circle." },
      { question: "How do I convert watts to horsepower?", answer: "1 horsepower = 746 watts. Divide watts by 746 to get horsepower. Used for motors and engine ratings." },
      { question: "How do I calculate the wattage of a device from its label?", answer: "Check the label for voltage and current ratings, then multiply them. Example: 120V x 1.5A = 180W." },
      { question: "What is the difference between watts and watt-hours?", answer: "Watts measure instantaneous power. Watt-hours measure energy usage over time. 100W for 10 hours = 1,000 watt-hours (1 kWh)." },
      { question: "How does wire gauge affect power transmission?", answer: "Thinner wires have higher resistance, causing power loss as heat. Use thicker gauge wires for higher power applications." },
      { question: "What is RMS power in audio systems?", answer: "RMS power is the continuous power handling capability of speakers or amplifiers, more accurate than peak power ratings." },
    ],
    relatedSlugs: ["ohms-law-calculator", "power-calculator", "voltage-divider-calculator"],
  },
  {
    icon: Hammer,
    name: "Concrete Calculator",
    slug: "concrete-calculator",
    category: "construction",
    description: "Calculate concrete volume and material requirements for your project.",
    metaTitle: "Concrete Calculator | Concrete Volume & Materials Calculator",
    metaDescription: "Free concrete calculator to estimate volume in cubic yards and materials needed (cement, sand, aggregate) for slabs and footings.",
    inputs: [
      { label: "Length", key: "length", type: "number", placeholder: "e.g., 10", min: 0.1, step: 0.5, defaultValue: 10 },
      { label: "Width", key: "width", type: "number", placeholder: "e.g., 10", min: 0.1, step: 0.5, defaultValue: 10 },
      { label: "Depth", key: "depth", type: "number", placeholder: "e.g., 0.5", min: 0.1, step: 0.1, defaultValue: 0.5 },
      { label: "Unit", key: "unit", type: "select", options: [{ label: "Feet", value: "ft" }, { label: "Meters", value: "m" }], defaultValue: "ft" },
    ],
    compute: (inputs) => {
      let l = Number(inputs.length), w = Number(inputs.width), d = Number(inputs.depth);
      if (inputs.unit === "ft") { l *= 0.3048; w *= 0.3048; d *= 0.3048; }
      const volM3 = Math.round(l*w*d*100)/100;
      const volYd3 = Math.round(volM3*1.30795*100)/100;
      const cement = Math.round(volM3*350);
      const sand = Math.round(volM3*700);
      const agg = Math.round(volM3*1200);
      return [
        { label: "Concrete Volume", key: "volume", value: volYd3, unit: "cu yd", color: "green" },
        { label: "Volume (Metric)", key: "volumeM3", value: volM3, unit: "cu m", color: "blue" },
        { label: "Cement Needed", key: "cement", value: cement, unit: "kg", color: "default" },
        { label: "Sand Needed", key: "sand", value: sand, unit: "kg", color: "default" },
        { label: "Aggregate Needed", key: "aggregate", value: agg, unit: "kg", color: "default" },
        { label: "Water (approx)", key: "water", value: Math.round(cement*0.5), unit: "L", color: "default" },
      ];
    },
    example: { inputs: { length: 10, width: 10, depth: 0.5, unit: "ft" }, results: [] },
    faqs: [
      { question: "What is the standard concrete mix?", answer: "A common mix ratio is 1:2:4 (cement:sand:aggregate) by volume for general construction." },
      { question: "How much water do I add?", answer: "Typically about 0.5 times the weight of cement, but adjust for workability." },
      { question: "How do I calculate concrete volume for a slab?", answer: "Multiply length x width x depth. For a 10x10 ft slab at 0.5 ft thick, volume = 50 cubic feet or about 1.85 cubic yards." },
      { question: "What is the difference between concrete and cement?", answer: "Cement is a binding ingredient. Concrete is a mixture of cement, sand, aggregate, and water. Cement makes up about 10-15% of the concrete mix." },
      { question: "How many bags of cement do I need?", answer: "One 50kg bag of cement yields about 0.035 cubic meters of concrete. Divide your total volume by this to estimate bags needed." },
      { question: "What is the curing time for concrete?", answer: "Concrete reaches about 70% strength in 7 days and full strength in 28 days. Keep it moist during curing for best results." },
      { question: "How do I convert cubic feet to cubic yards?", answer: "Divide cubic feet by 27. One cubic yard = 27 cubic feet. Most ready-mix concrete is ordered in cubic yards." },
      { question: "What is reinforced concrete?", answer: "Reinforced concrete has steel bars (rebar) or mesh embedded to improve tensile strength, which concrete alone lacks." },
    ],
    relatedSlugs: ["paint-calculator", "tile-calculator", "flooring-calculator"],
  },
  {
    icon: PaintBucket,
    name: "Paint Calculator",
    slug: "paint-calculator",
    category: "construction",
    description: "Calculate how much paint you need for your walls.",
    metaTitle: "Paint Calculator | Paint Coverage & Quantity Calculator",
    metaDescription: "Free paint calculator to estimate how many liters or gallons of paint and primer you need for any room.",
    inputs: [
      { label: "Wall Area", key: "wallArea", type: "number", placeholder: "e.g., 350", min: 1, step: 10, defaultValue: 350 },
      { label: "Number of Coats", key: "coats", type: "number", placeholder: "e.g., 2", min: 1, max: 5, defaultValue: 2 },
      { label: "Area Unit", key: "areaUnit", type: "select", options: [{ label: "Sq Ft", value: "sqft" }, { label: "Sq M", value: "sqm" }], defaultValue: "sqft" },
    ],
    compute: (inputs) => {
      let area = Number(inputs.wallArea);
      const coats = Number(inputs.coats);
      if (inputs.areaUnit === "sqm") area = area * 10.7639;
      const paintL = Math.round(area / 350 * coats * 10) / 10;
      const primerL = Math.round(area / 400 * 10) / 10;
      return [
        { label: "Paint Needed", key: "paintLiters", value: paintL, unit: "L", color: "green" },
        { label: "Paint (Gallons)", key: "paintGal", value: Math.round(paintL / 3.785 * 10) / 10, unit: "gal", color: "blue" },
        { label: "Primer Needed", key: "primerL", value: primerL, unit: "L", color: "default" },
        { label: "Primer (Gallons)", key: "primerGal", value: Math.round(primerL / 3.785 * 10) / 10, unit: "gal", color: "default" },
      ];
    },
    example: { inputs: { wallArea: 350, coats: 2, areaUnit: "sqft" }, results: [] },
    faqs: [
      { question: "How much area does a liter of paint cover?", answer: "Typically one liter covers about 350 sq ft (33 sq m) for smooth surfaces." },
      { question: "Do I need primer?", answer: "Primer is recommended for new drywall, dark colors, or porous surfaces. One coat is usually sufficient." },
      { question: "How do I calculate the total wall area of a room?", answer: "Measure the perimeter of the room and multiply by ceiling height. Subtract the area of doors and windows for accurate estimates." },
      { question: "How many coats of paint should I apply?", answer: "Two coats are standard for even coverage and durability. Dark or drastic color changes may need three coats." },
      { question: "What is the difference between matte and gloss paint?", answer: "Matte has no shine and hides imperfections well. Gloss is shiny, durable, and easier to clean but highlights wall flaws." },
      { question: "Does paint type affect coverage?", answer: "Yes, textured paints cover less area per liter. Smooth emulsion covers more. Quality paints often have better coverage than budget options." },
      { question: "How do I convert liters to gallons for paint?", answer: "Divide liters by 3.785. A standard paint can in the US is 1 gallon (3.785 L). In many other countries, paint is sold in 1L, 4L, or 10L cans." },
      { question: "How does surface texture affect paint quantity?", answer: "Rough surfaces like brick or textured walls require more paint because they have more surface area than smooth walls." },
    ],
    relatedSlugs: ["concrete-calculator", "tile-calculator", "flooring-calculator"],
  },
  {
    icon: LayoutGrid,
    name: "Tile Calculator",
    slug: "tile-calculator",
    category: "construction",
    description: "Calculate how many tiles you need for any area.",
    metaTitle: "Tile Calculator | Tile Quantity Calculator Online",
    metaDescription: "Free tile calculator to estimate the number of tiles needed including 10% waste factor for flooring and walls.",
    inputs: [
      { label: "Total Area", key: "area", type: "number", placeholder: "e.g., 100", min: 1, step: 10, defaultValue: 100 },
      { label: "Area Unit", key: "areaUnit", type: "select", options: [{ label: "Sq Ft", value: "sqft" }, { label: "Sq M", value: "sqm" }], defaultValue: "sqft" },
      { label: "Tile Length", key: "tileLength", type: "number", placeholder: "e.g., 12", min: 0.5, step: 0.5, defaultValue: 12 },
      { label: "Tile Width", key: "tileWidth", type: "number", placeholder: "e.g., 12", min: 0.5, step: 0.5, defaultValue: 12 },
      { label: "Tile Unit", key: "tileUnit", type: "select", options: [{ label: "Inches", value: "in" }, { label: "cm", value: "cm" }], defaultValue: "in" },
    ],
    compute: (inputs) => {
      let area = Number(inputs.area);
      let tl = Number(inputs.tileLength), tw = Number(inputs.tileWidth);
      if (inputs.areaUnit === "sqm") area *= 10.7639;
      if (inputs.tileUnit === "cm") { tl /= 2.54; tw /= 2.54; }
      const tileSqIn = tl * tw;
      const tiles = Math.ceil((area * 144) / tileSqIn);
      const waste = Math.ceil(tiles * 0.1);
      return [
        { label: "Tiles Needed", key: "tiles", value: tiles, color: "green" },
        { label: "Waste (10%)", key: "waste", value: waste, color: "amber" },
        { label: "Total Tiles", key: "total", value: tiles + waste, color: "blue" },
        { label: "Boxes Needed", key: "boxes", value: Math.ceil((tiles + waste) / 10), color: "default" },
      ];
    },
    example: { inputs: { area: 100, areaUnit: "sqft", tileLength: 12, tileWidth: 12, tileUnit: "in" }, results: [] },
    faqs: [
      { question: "How many tiles do I need?", answer: "Divide your area by the area of one tile. Always add 10-15% extra for waste and cuts." },
      { question: "How do I measure for tiles?", answer: "Measure length and width of the area, calculate total sq ft, then divide by tile sq ft." },
      { question: "Why do I need extra tiles beyond the calculated area?", answer: "Extra tiles account for cuts around edges, corners, and fixtures. Having spares also helps if tiles break or need future replacement." },
      { question: "How many tiles come in a box?", answer: "Most tile boxes contain 10 tiles, though this varies. Check the box label for the exact count and total coverage area." },
      { question: "How do I calculate tiles in square meters?", answer: "Convert tile dimensions to meters, multiply for tile area, then divide the room area in square meters by the tile area." },
      { question: "What is the best tile pattern for small rooms?", answer: "Larger tiles with minimal grout lines make small rooms appear bigger. Diagonal patterns can also visually expand the space." },
      { question: "How do I calculate the number of tiles for a wall instead of floor?", answer: "Measure the wall height and width, calculate area, and divide by tile area. The same formula works for walls and floors." },
      { question: "How do I account for grout lines in tile calculation?", answer: "For standard tiles, grout lines are minimal and do not significantly change tile counts. For mosaic tiles, add 5% more for grout spacing." },
    ],
    relatedSlugs: ["flooring-calculator", "concrete-calculator", "paint-calculator"],
  },
  {
    icon: House,
    name: "Roofing Calculator",
    slug: "roofing-calculator",
    category: "construction",
    description: "Calculate roof area, materials, and cost for your roofing project.",
    metaTitle: "Roofing Calculator | Roof Area & Materials Calculator",
    metaDescription: "Free roofing calculator to estimate roof area, shingles, and materials needed based on roof dimensions and pitch.",
    inputs: [
      { label: "Length", key: "length", type: "number", placeholder: "e.g., 40", min: 1, step: 1, defaultValue: 40 },
      { label: "Width", key: "width", type: "number", placeholder: "e.g., 30", min: 1, step: 1, defaultValue: 30 },
      { label: "Roof Pitch (rise/12)", key: "pitch", type: "number", placeholder: "e.g., 6", min: 0, max: 24, step: 1, defaultValue: 6 },
      { label: "Unit", key: "unit", type: "select", options: [{ label: "Feet", value: "ft" }, { label: "Meters", value: "m" }], defaultValue: "ft" },
    ],
    compute: (inputs) => {
      let l = Number(inputs.length), w = Number(inputs.width);
      const p = Number(inputs.pitch);
      if (inputs.unit === "m") { l *= 3.28084; w *= 3.28084; }
      const pf = Math.sqrt(1 + Math.pow(p/12, 2));
      const area = Math.round(l * w * pf * 100) / 100;
      const sheets = Math.ceil(area / 32);
      return [
        { label: "Roof Area", key: "roofArea", value: area, unit: "sq ft", color: "green" },
        { label: "Pitch Factor", key: "pitchFactor", value: Math.round(pf*100)/100, color: "default" },
        { label: "Sheets Needed", key: "sheets", value: sheets, unit: "plywood sheets", color: "blue" },
        { label: "Nails (approx)", key: "nails", value: sheets * 80, color: "default" },
      ];
    },
    example: { inputs: { length: 40, width: 30, pitch: 6, unit: "ft" }, results: [] },
    faqs: [
      { question: "What is roof pitch?", answer: "Roof pitch is the slope expressed as inches of rise per 12 inches of horizontal run." },
      { question: "How is roof area different from floor area?", answer: "Roof area is larger than floor area because it accounts for the slope of the roof." },
      { question: "How do I calculate roof pitch?", answer: "Measure the vertical rise over 12 inches of horizontal run. A 6/12 pitch rises 6 inches for every 12 inches of horizontal distance." },
      { question: "What is the pitch factor?", answer: "The pitch factor is a multiplier that converts floor area to roof area. For a 6/12 pitch, the factor is about 1.118." },
      { question: "How many shingles do I need for my roof?", answer: "Shingles are sold in bundles. Three bundles typically cover 100 sq ft (1 square). Divide your roof area by 100 and multiply by 3." },
      { question: "What is a roofing square?", answer: "A roofing square is 100 sq ft of roof area. Contractors price roofs in squares. A 1,500 sq ft roof equals 15 squares." },
      { question: "What materials do I need besides shingles?", answer: "You will need underlayment, drip edge, flashing for valleys and chimneys, ridge vents, and nails. The calculator estimates nails at 80 per plywood sheet." },
      { question: "How does roof pitch affect material choice?", answer: "Steeper pitches (above 7/12) may require special installation techniques and additional safety measures. Low slopes need specialized roofing materials." },
    ],
    relatedSlugs: ["concrete-calculator", "flooring-calculator", "paint-calculator"],
  },
  {
    icon: Kanban,
    name: "Flooring Calculator",
    slug: "flooring-calculator",
    category: "construction",
    description: "Calculate how much flooring material you need for any room.",
    metaTitle: "Flooring Calculator | Flooring Material Calculator",
    metaDescription: "Free flooring calculator to estimate planks, boxes, and material needed for laminate, hardwood, or vinyl flooring.",
    inputs: [
      { label: "Room Area", key: "area", type: "number", placeholder: "e.g., 200", min: 1, step: 10, defaultValue: 200 },
      { label: "Area Unit", key: "areaUnit", type: "select", options: [{ label: "Sq Ft", value: "sqft" }, { label: "Sq M", value: "sqm" }], defaultValue: "sqft" },
      { label: "Plank Length", key: "plankLength", type: "number", placeholder: "e.g., 48", min: 1, step: 1, defaultValue: 48 },
      { label: "Plank Width", key: "plankWidth", type: "number", placeholder: "e.g., 5", min: 1, step: 0.5, defaultValue: 5 },
      { label: "Plank Unit", key: "plankUnit", type: "select", options: [{ label: "Inches", value: "in" }, { label: "cm", value: "cm" }], defaultValue: "in" },
    ],
    compute: (inputs) => {
      let area = Number(inputs.area);
      let pl = Number(inputs.plankLength), pw = Number(inputs.plankWidth);
      if (inputs.areaUnit === "sqm") area *= 10.7639;
      if (inputs.plankUnit === "cm") { pl /= 2.54; pw /= 2.54; }
      const plankSqIn = pl * pw;
      const planks = Math.ceil((area * 144) / plankSqIn);
      const waste = Math.ceil(planks * 0.1);
      return [
        { label: "Planks Needed", key: "planks", value: planks, color: "green" },
        { label: "Waste (10%)", key: "waste", value: waste, color: "amber" },
        { label: "Total Planks", key: "total", value: planks + waste, color: "blue" },
        { label: "Boxes Needed", key: "boxes", value: Math.ceil((planks + waste) / 20), color: "default" },
      ];
    },
    example: { inputs: { area: 200, areaUnit: "sqft", plankLength: 48, plankWidth: 5, plankUnit: "in" }, results: [] },
    faqs: [
      { question: "How much extra flooring should I buy?", answer: "Always buy 10-15% extra for waste, cuts, and future repairs. This is the standard waste factor." },
      { question: "How many planks are in a box?", answer: "Laminate flooring typically has about 20 planks per box, covering roughly 20 sq ft." },
      { question: "How do I calculate flooring area for irregular rooms?", answer: "Divide the room into rectangles, calculate each area separately, then add them together for total square footage." },
      { question: "What is the difference between laminate and hardwood flooring?", answer: "Laminate is engineered with a photographic layer and is more affordable and scratch-resistant. Hardwood is solid wood that can be refinished multiple times." },
      { question: "How do I measure for flooring with obstacles?", answer: "Measure around columns, cabinets, and other obstacles. For complicated layouts, create a floor plan drawing with measurements." },
      { question: "What is the best flooring direction?", answer: "Planks are typically laid parallel to the longest wall or perpendicular to floor joists. Follow the light source for visual appeal." },
      { question: "How do I calculate flooring for stairs?", answer: "Measure the tread (horizontal) and riser (vertical) of one stair, multiply by the number of stairs, and add to your total area." },
      { question: "Does underlayment affect flooring calculation?", answer: "Underlayment is separate from planks. It is typically sold in rolls covering a specific area and does not affect the number of planks needed." },
    ],
    relatedSlugs: ["tile-calculator", "concrete-calculator", "paint-calculator"],
  },
  {
    icon: Tag,
    name: "Discount Calculator",
    slug: "discount-calculator",
    category: "everyday-life",
    description: "Calculate savings and final price after a discount.",
    metaTitle: "Discount Calculator | Calculate Savings & Final Price",
    metaDescription: "Free discount calculator to find the final price after discount, how much you save, and the discounted price.",
    inputs: [
      { label: "Original Price", key: "originalPrice", type: "number", placeholder: "e.g., 100", min: 0.01, step: 0.01, defaultValue: 100 },
      { label: "Discount %", key: "discountPercent", type: "number", placeholder: "e.g., 20", min: 0, max: 100, step: 1, defaultValue: 20 },
    ],
    compute: (inputs) => {
      const p = Number(inputs.originalPrice);
      const d = Number(inputs.discountPercent);
      const disc = Math.round(p * d / 100 * 100) / 100;
      const final = Math.round((p - disc) * 100) / 100;
      return [
        { label: "Discount Amount", key: "discountAmount", value: disc, unit: "₹", color: "green" },
        { label: "Final Price", key: "finalPrice", value: final, unit: "₹", color: "green" },
        { label: "You Save", key: "savings", value: disc, unit: "₹", color: "green" },
        { label: "Savings %", key: "savingsPct", value: d, unit: "%", color: "default" },
      ];
    },
    chart: (results) => {
      const disc = results.find(r => r.key === "discountAmount")?.value as number || 0;
      const final = results.find(r => r.key === "finalPrice")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Discount Amount", "Final Price"],
          datasets: [{
            data: [disc, final],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(99, 102, 241, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(99, 102, 241, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { originalPrice: 100, discountPercent: 20 }, results: [] },
    faqs: [
      { question: "How to calculate discount?", answer: "Multiply the original price by the discount percentage and divide by 100." },
      { question: "What is a good discount?", answer: "Discounts vary by industry. 10-20% is common for retail, 50%+ for clearance." },
      { question: "How do I calculate the final price after a discount?", answer: "Subtract the discount amount from the original price. For 20% off $100: discount = $20, final = $80." },
      { question: "How do I calculate the original price from a discounted price?", answer: "Divide the sale price by (1 - discount percentage). For $80 after 20% off: original = 80 / 0.80 = $100." },
      { question: "What is a tiered discount?", answer: "Tiered discounts increase with purchase value, like 10% off $50, 15% off $100, and 20% off $200." },
      { question: "How do I calculate a percentage discount from a sale price?", answer: "Divide the discount amount by the original price and multiply by 100. Savings of $20 on $100 = 20% discount." },
      { question: "What is the difference between discount and markup?", answer: "A discount reduces the price from the original. A markup adds to the cost price to determine the selling price." },
      { question: "How do I calculate tax after a discount?", answer: "Apply the discount first to get the sale price, then calculate tax on the reduced price." },
    ],
    relatedSlugs: ["tip-calculator", "split-bill-calculator", "percentage-calculator"],
  },
  {
    icon: HandCoins,
    name: "Tip Calculator",
    slug: "tip-calculator",
    category: "everyday-life",
    description: "Calculate tip amount, total bill, and split between multiple people.",
    metaTitle: "Tip Calculator | Calculate Tip & Split Bill",
    metaDescription: "Free tip calculator to calculate tip amount, total bill, and per-person share when splitting with friends.",
    inputs: [
      { label: "Bill Amount", key: "billAmount", type: "number", placeholder: "e.g., 75.50", min: 0.01, step: 0.01, defaultValue: 75.50 },
      { label: "Tip %", key: "tipPercent", type: "number", placeholder: "e.g., 15", min: 0, max: 100, step: 1, defaultValue: 15 },
      { label: "Split Between", key: "splitCount", type: "number", placeholder: "e.g., 2", min: 1, max: 100, defaultValue: 1 },
    ],
    compute: (inputs) => {
      const bill = Number(inputs.billAmount);
      const pct = Number(inputs.tipPercent);
      const split = Number(inputs.splitCount);
      const tip = Math.round(bill * pct / 100 * 100) / 100;
      const total = Math.round((bill + tip) * 100) / 100;
      return [
        { label: "Tip Amount", key: "tipAmount", value: tip, unit: "₹", color: "blue" },
        { label: "Total Bill", key: "total", value: total, unit: "₹", color: "green" },
        { label: "Each Pays", key: "perPerson", value: Math.round(total / split * 100) / 100, unit: "₹", color: "green" },
        { label: "Split", key: "splitCount", value: split, unit: "people", color: "default" },
      ];
    },
    chart: (results) => {
      const tip = results.find(r => r.key === "tipAmount")?.value as number || 0;
      const bill = results.find(r => r.key === "total")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Bill Amount", "Tip Amount"],
          datasets: [{
            data: [bill - tip, tip],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { billAmount: 75.50, tipPercent: 15, splitCount: 2 }, results: [] },
    faqs: [
      { question: "How much should I tip?", answer: "15-20% is standard for good service in restaurants. 10-15% for other services." },
      { question: "How is the bill split calculated?", answer: "The total bill including tip is divided equally among the number of people." },
      { question: "Should I tip before or after tax?", answer: "Most etiquette guides recommend tipping on the pre-tax amount, but tipping on the total including tax is a generous alternative." },
      { question: "What is the difference between a tip and a service charge?", answer: "A tip is voluntary and goes to staff. A service charge is mandatory and may go to the establishment. Some places include both." },
      { question: "Is tipping customary in all countries?", answer: "No, tipping customs vary. In Japan and South Korea, tipping is not expected. In the US, tipping 15-20% is standard for sit-down meals." },
      { question: "How do I calculate a tip quickly without a calculator?", answer: "Move the decimal one place left for 10%, then double for 20%. For 15%, add 10% + half of 10%." },
      { question: "Should I tip on delivery orders?", answer: "Yes, 10-15% for food delivery is standard. Consider more for large orders, bad weather, or long distances." },
      { question: "How do I split a tip between multiple service providers?", answer: "Calculate the total tip, then divide by the number of people receiving the tip, or give each person a separate tip." },
    ],
    relatedSlugs: ["discount-calculator", "split-bill-calculator", "percentage-calculator"],
  },
  {
    icon: HandCoins,
    name: "Split Bill Calculator",
    slug: "split-bill-calculator",
    category: "everyday-life",
    description: "Split any bill evenly between multiple people.",
    metaTitle: "Split Bill Calculator | Bill Splitting Calculator",
    metaDescription: "Free bill splitting calculator to divide expenses evenly between friends, roommates, or groups.",
    inputs: [
      { label: "Total Amount", key: "totalAmount", type: "number", placeholder: "e.g., 120", min: 0.01, step: 0.01, defaultValue: 120 },
      { label: "Number of People", key: "people", type: "number", placeholder: "e.g., 4", min: 1, max: 100, defaultValue: 4 },
    ],
    compute: (inputs) => {
      const total = Number(inputs.totalAmount);
      const people = Number(inputs.people);
      const each = Math.round(total / people * 100) / 100;
      return [
        { label: "Each Person Pays", key: "eachPays", value: each, unit: "₹", color: "green" },
        { label: "Total Amount", key: "totalAmount", value: total, unit: "₹", color: "blue" },
        { label: "Number of People", key: "people", value: people, color: "default" },
        { label: "Remainder", key: "remainder", value: Math.round((total - each * people) * 100) / 100, unit: "₹", color: "amber" },
      ];
    },
    chart: (results) => {
      const each = results.find(r => r.key === "eachPays")?.value as number || 0;
      const total = results.find(r => r.key === "totalAmount")?.value as number || 0;
      const others = total - each;
      return {
        type: "bar",
        data: {
          labels: ["Each Person", "Remainder"],
          datasets: [{
            label: "Amount",
            data: [each, Math.max(0, others)],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { totalAmount: 120, people: 4 }, results: [] },
    faqs: [
      { question: "How do I split a bill unevenly?", answer: "This calculator splits evenly. For uneven splits, calculate each person's share separately." },
      { question: "What if the amount doesnt divide evenly?", answer: "The remainder shows the difference. One person can pay slightly more to cover it." },
      { question: "How do I split a bill including tip?", answer: "Add the tip to the total bill first, then divide by the number of people. Use the tip calculator to add the tip." },
      { question: "What is the best way to split a bill with couples?", answer: "If couples consume different amounts, consider itemizing. For simplicity, splitting evenly per person is most common." },
      { question: "How do I handle splitting shared expenses like rent or utilities?", answer: "Divide equally for shared spaces, or use proportional splitting based on room size or income for shared housing." },
      { question: "Can I split a bill that includes items shared by some but not all?", answer: "For shared items, split those costs only among the people who shared them, then divide individual items separately." },
      { question: "What app can I use for splitting bills?", answer: "Many apps like Splitwise, Venmo, and PayPal simplify bill splitting and tracking shared expenses among groups." },
      { question: "How do I split a restaurant bill with tax and tip?", answer: "First add tax to the bill total, then add tip based on the pre-tax amount, then divide the final total by the number of people." },
    ],
    relatedSlugs: ["tip-calculator", "discount-calculator", "percentage-calculator"],
  },
  {
    icon: Car,
    name: "Fuel Cost Calculator",
    slug: "fuel-cost-calculator",
    category: "everyday-life",
    description: "Calculate fuel cost and consumption for any trip.",
    metaTitle: "Fuel Cost Calculator | Trip Fuel Cost Estimator",
    metaDescription: "Free fuel cost calculator to estimate fuel needed and total cost for any trip based on distance and mileage.",
    inputs: [
      { label: "Distance", key: "distance", type: "number", placeholder: "e.g., 300", min: 1, step: 10, defaultValue: 300 },
      { label: "Distance Unit", key: "distanceUnit", type: "select", options: [{ label: "km", value: "km" }, { label: "Miles", value: "mi" }], defaultValue: "km" },
      { label: "Fuel Efficiency", key: "mileage", type: "number", placeholder: "e.g., 15", min: 0.1, step: 0.5, defaultValue: 15 },
      { label: "Efficiency Unit", key: "mileageUnit", type: "select", options: [{ label: "km/L", value: "kmpl" }, { label: "MPG", value: "mpg" }], defaultValue: "kmpl" },
      { label: "Fuel Price per Liter", key: "fuelPrice", type: "number", placeholder: "e.g., 1.50", min: 0.01, step: 0.01, defaultValue: 1.50 },
    ],
    compute: (inputs) => {
      let d = Number(inputs.distance);
      let m = Number(inputs.mileage);
      if (inputs.distanceUnit === "mi") d *= 1.60934;
      if (inputs.mileageUnit === "mpg") m *= 0.425144;
      const fuel = Math.round(d / m * 100) / 100;
      const price = Number(inputs.fuelPrice);
      const cost = Math.round(fuel * price * 100) / 100;
      return [
        { label: "Fuel Needed", key: "fuelNeeded", value: fuel, unit: "L", color: "blue" },
        { label: "Total Cost", key: "totalCost", value: cost, unit: "₹", color: "green" },
        { label: "Cost per km", key: "costPerKm", value: Math.round(cost / d * 100) / 100, unit: "₹/km", color: "default" },
        { label: "Cost per mile", key: "costPerMi", value: Math.round(cost / (inputs.distanceUnit === "mi" ? Number(inputs.distance) : d/1.60934) * 100) / 100, unit: "₹/mi", color: "default" },
      ];
    },
    chart: (results) => {
      const fuel = results.find(r => r.key === "fuelNeeded")?.value as number || 0;
      const cost = results.find(r => r.key === "totalCost")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Fuel Needed (L)", "Total Cost (₹)"],
          datasets: [{
            label: "Fuel Trip",
            data: [fuel, cost],
            backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(59, 130, 246, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { distance: 300, distanceUnit: "km", mileage: 15, mileageUnit: "kmpl", fuelPrice: 1.50 }, results: [] },
    faqs: [
      { question: "How do I calculate fuel cost?", answer: "Divide trip distance by your vehicles fuel efficiency, then multiply by fuel price per liter." },
      { question: "What affects fuel economy?", answer: "Driving habits, vehicle condition, tire pressure, traffic, terrain, and weather all affect fuel efficiency." },
      { question: "How do I convert MPG to km/L?", answer: "Multiply MPG by 0.425. For example, 30 MPG = 30 x 0.425 = 12.75 km/L." },
      { question: "How can I improve my fuel efficiency?", answer: "Maintain steady speeds, avoid rapid acceleration, keep tires properly inflated, reduce weight, and use cruise control on highways." },
      { question: "How do I calculate fuel cost for a round trip?", answer: "Double the one-way distance before using the calculator, or calculate one-way and multiply the total cost by 2." },
      { question: "What is the difference between highway and city fuel economy?", answer: "City driving with frequent stops gives lower fuel economy. Highway driving at consistent speeds gives better efficiency." },
      { question: "How much does idling affect fuel consumption?", answer: "Idling can consume 0.5-1 liter of fuel per hour. Turn off the engine if stopped for more than a minute to save fuel." },
      { question: "How do seasonal temperatures affect fuel economy?", answer: "Cold weather reduces fuel economy by 10-20% due to thicker oil, longer warm-up times, and increased use of heaters and defrosters." },
    ],
    relatedSlugs: ["discount-calculator", "tip-calculator", "percentage-calculator"],
  },
  {
    icon: DollarSign,
    name: "Paycheck Calculator",
    slug: "paycheck-calculator",
    category: "finance",
    description: "Calculate your estimated take-home pay based on salary, taxes, deductions, and pay frequency in the United States.",
    metaTitle: "Paycheck Calculator | Calculate Take-Home Pay After Taxes",
    metaDescription: "Free paycheck calculator for US employees. Calculate take-home pay after federal, state taxes, FICA, and deductions.",
    inputs: [
      { label: "Annual Salary", key: "annualSalary", type: "number", placeholder: "e.g., 75000", min: 1, step: 1000, defaultValue: 75000 },
      { label: "Pay Frequency", key: "payFrequency", type: "select", options: [
        { label: "Weekly (52/year)", value: "weekly" },
        { label: "Bi-Weekly (26/year)", value: "biweekly" },
        { label: "Semi-Monthly (24/year)", value: "semimonthly" },
        { label: "Monthly (12/year)", value: "monthly" },
      ], defaultValue: "biweekly" },
      { label: "Federal Filing Status", key: "filingStatus", type: "select", options: [
        { label: "Single", value: "single" },
        { label: "Married Filing Jointly", value: "married" },
        { label: "Head of Household", value: "head" },
      ], defaultValue: "single" },
      { label: "State", key: "state", type: "select", options: [
        { label: "No State Tax", value: "none" },
        { label: "California", value: "CA" },
        { label: "New York", value: "NY" },
        { label: "Texas", value: "TX" },
        { label: "Florida", value: "FL" },
        { label: "Illinois", value: "IL" },
        { label: "Pennsylvania", value: "PA" },
        { label: "Ohio", value: "OH" },
        { label: "Georgia", value: "GA" },
        { label: "North Carolina", value: "NC" },
        { label: "Michigan", value: "MI" },
        { label: "New Jersey", value: "NJ" },
        { label: "Virginia", value: "VA" },
        { label: "Washington", value: "WA" },
        { label: "Arizona", value: "AZ" },
        { label: "Massachusetts", value: "MA" },
        { label: "Tennessee", value: "TN" },
        { label: "Indiana", value: "IN" },
        { label: "Missouri", value: "MO" },
        { label: "Maryland", value: "MD" },
        { label: "Wisconsin", value: "WI" },
        { label: "Minnesota", value: "MN" },
        { label: "Colorado", value: "CO" },
        { label: "Alabama", value: "AL" },
        { label: "South Carolina", value: "SC" },
        { label: "Louisiana", value: "LA" },
        { label: "Kentucky", value: "KY" },
        { label: "Oregon", value: "OR" },
        { label: "Oklahoma", value: "OK" },
        { label: "Connecticut", value: "CT" },
        { label: "Iowa", value: "IA" },
        { label: "Mississippi", value: "MS" },
        { label: "Kansas", value: "KS" },
        { label: "Arkansas", value: "AR" },
        { label: "Utah", value: "UT" },
        { label: "Nevada", value: "NV" },
        { label: "New Mexico", value: "NM" },
        { label: "West Virginia", value: "WV" },
        { label: "Nebraska", value: "NE" },
        { label: "Idaho", value: "ID" },
        { label: "Hawaii", value: "HI" },
        { label: "Maine", value: "ME" },
        { label: "New Hampshire", value: "NH" },
        { label: "Rhode Island", value: "RI" },
        { label: "Montana", value: "MT" },
        { label: "Delaware", value: "DE" },
        { label: "South Dakota", value: "SD" },
        { label: "North Dakota", value: "ND" },
        { label: "Vermont", value: "VT" },
        { label: "Wyoming", value: "WY" },
        { label: "Alaska", value: "AK" },
      ], defaultValue: "none" },
      { label: "401(k) Contribution %", key: "retirement401k", type: "number", placeholder: "e.g., 6", min: 0, max: 100, step: 0.5, defaultValue: 6 },
      { label: "Health Insurance (per pay)", key: "healthInsurance", type: "number", placeholder: "e.g., 150", min: 0, step: 10, defaultValue: 150 },
    ],
    compute: (inputs) => {
      const salary = Number(inputs.annualSalary);
      const freq = inputs.payFrequency as string;
      const periods: Record<string, number> = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };
      const perPeriod = periods[freq] || 26;
      const grossPerPay = salary / perPeriod;

      const filing = inputs.filingStatus as string;
      const stdDeduction = filing === "single" ? 14600 : filing === "head" ? 21900 : 29200;
      const taxableIncome = Math.max(0, salary - stdDeduction);

      let federalTax = 0;
      const brackets: { rate: number; limit: number }[] = filing === "married"
        ? [{ rate: 10, limit: 23200 }, { rate: 12, limit: 94300 }, { rate: 22, limit: 201050 }, { rate: 24, limit: 383900 }, { rate: 32, limit: 487450 }, { rate: 35, limit: 731200 }]
        : filing === "head"
        ? [{ rate: 10, limit: 16550 }, { rate: 12, limit: 63100 }, { rate: 22, limit: 100500 }, { rate: 24, limit: 191950 }, { rate: 32, limit: 243700 }, { rate: 35, limit: 609350 }]
        : [{ rate: 10, limit: 11600 }, { rate: 12, limit: 47150 }, { rate: 22, limit: 100525 }, { rate: 24, limit: 191950 }, { rate: 32, limit: 243725 }, { rate: 35, limit: 609350 }];

      let remaining = taxableIncome;
      let prevLimit = 0;
      for (const b of brackets) {
        const taxable = Math.min(Math.max(remaining, 0), b.limit - prevLimit);
        federalTax += taxable * b.rate / 100;
        remaining -= taxable;
        prevLimit = b.limit;
        if (remaining <= 0) break;
      }
      if (remaining > 0) federalTax += remaining * 37 / 100;

      const federalPerPay = federalTax / perPeriod;

      const socialSecurity = Math.min(salary, 168600) * 0.062 / perPeriod;
      const medicare = salary * 0.0145 / perPeriod;
      const ficaPerPay = socialSecurity + medicare;

      const stateTaxRates: Record<string, number> = {
        CA: 0.093, NY: 0.0685, IL: 0.0495, PA: 0.0307, OH: 0.035, GA: 0.0549,
        NC: 0.0475, MI: 0.0425, NJ: 0.0637, VA: 0.055, AZ: 0.045, MA: 0.05,
        IN: 0.0315, MO: 0.0495, MD: 0.0575, WI: 0.053, MN: 0.0785, CO: 0.044,
        AL: 0.05, SC: 0.064, LA: 0.0425, KY: 0.045, OR: 0.0875, OK: 0.0475,
        CT: 0.0699, IA: 0.0575, MS: 0.05, KS: 0.057, AR: 0.055, UT: 0.0485,
        NM: 0.049, WV: 0.065, NE: 0.0664, ID: 0.058, HI: 0.088, ME: 0.0715,
        NH: 0.05, RI: 0.0587, MT: 0.0675, DE: 0.066, VT: 0.066, AK: 0,
        WY: 0, SD: 0, NV: 0, TN: 0, TX: 0, WA: 0, FL: 0,
      };
      const stateRate = stateTaxRates[inputs.state as string] || 0;
      const statePerPay = (salary * stateRate) / perPeriod;

      const retirementPct = Number(inputs.retirement401k) / 100;
      const retirementPerPay = salary * retirementPct / perPeriod;

      const healthPerPay = Number(inputs.healthInsurance);

      const totalDeductions = federalPerPay + ficaPerPay + statePerPay + retirementPerPay + healthPerPay;
      const netPerPay = grossPerPay - totalDeductions;
      const netAnnual = netPerPay * perPeriod;

      return [
        { label: "Gross Pay", key: "grossPerPay", value: Math.round(grossPerPay * 100) / 100, unit: "$", color: "blue" },
        { label: "Federal Tax", key: "federalPerPay", value: Math.round(federalPerPay * 100) / 100, unit: "$", color: "red" },
        { label: "FICA (SS + Medicare)", key: "ficaPerPay", value: Math.round(ficaPerPay * 100) / 100, unit: "$", color: "red" },
        { label: "State Tax", key: "statePerPay", value: Math.round(statePerPay * 100) / 100, unit: "$", color: "red" },
        { label: "401(k)", key: "retirementPerPay", value: Math.round(retirementPerPay * 100) / 100, unit: "$", color: "amber" },
        { label: "Health Insurance", key: "healthPerPay", value: Math.round(healthPerPay * 100) / 100, unit: "$", color: "amber" },
        { label: "Take-Home Pay", key: "netPerPay", value: Math.round(netPerPay * 100) / 100, unit: "$", color: "green" },
        { label: "Annual Take-Home", key: "netAnnual", value: Math.round(netAnnual * 100) / 100, unit: "$", color: "green" },
      ];
    },
    chart: (results) => {
      const gross = results.find(r => r.key === "grossPerPay")?.value as number || 0;
      const federal = results.find(r => r.key === "federalPerPay")?.value as number || 0;
      const fica = results.find(r => r.key === "ficaPerPay")?.value as number || 0;
      const state = results.find(r => r.key === "statePerPay")?.value as number || 0;
      const retire = results.find(r => r.key === "retirementPerPay")?.value as number || 0;
      const health = results.find(r => r.key === "healthPerPay")?.value as number || 0;
      const net = results.find(r => r.key === "netPerPay")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Federal Tax", "FICA", "State Tax", "401(k)", "Health Insurance", "Take-Home"],
          datasets: [{
            data: [federal, fica, state, retire, health, net],
            backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(168, 85, 247, 0.8)", "rgba(59, 130, 246, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(239, 68, 68, 1)", "rgba(245, 158, 11, 1)", "rgba(168, 85, 247, 1)", "rgba(59, 130, 246, 1)", "rgba(34, 197, 94, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { annualSalary: 75000, payFrequency: "biweekly", filingStatus: "single", state: "none", retirement401k: 6, healthInsurance: 150 }, results: [] },
    faqs: [
      { question: "What is take-home pay?", answer: "Take-home pay, also called net pay, is your income after all deductions including federal/state taxes, FICA, and benefits." },
      { question: "What is FICA?", answer: "FICA stands for Federal Insurance Contributions Act. It includes Social Security (6.2%) and Medicare (1.45%) taxes." },
      { question: "How are federal income taxes calculated?", answer: "The US uses a progressive tax system. Income is taxed at different rates across brackets. Our calculator applies the standard deduction and marginal rates." },
      { question: "What is the standard deduction for 2025?", answer: "For 2025: Single $14,600, Married Filing Jointly $29,200, Head of Household $21,900." },
      { question: "How does pay frequency affect my paycheck?", answer: "Weekly pay gives 52 paychecks, bi-weekly gives 26, semi-monthly gives 24, and monthly gives 12. Annual salary divided by pay periods equals gross per check." },
      { question: "What is the Social Security wage base?", answer: "For 2025, the Social Security tax applies only to income up to $168,600. Earnings above this are not subject to SS tax." },
      { question: "Are 401(k) contributions pre-tax?", answer: "Yes, traditional 401(k) contributions reduce your taxable income, lowering your current tax bill. Roth 401(k) contributions are post-tax." },
      { question: "How do state taxes affect my paycheck?", answer: "Some states (TX, FL, NV, etc.) have no state income tax. Others have flat or progressive rates. Our calculator includes many state rates." },
    ],
    relatedSlugs: ["tax-calculator", "salary-calculator", "freelance-rate-calculator"],
  },
  {
    icon: House,
    name: "Home Affordability Calculator",
    slug: "home-affordability-calculator",
    category: "real-estate",
    description: "Estimate how much house you can afford based on income, expenses, down payment, and mortgage rates.",
    metaTitle: "Home Affordability Calculator | How Much House Can You Afford?",
    metaDescription: "Free home affordability calculator. Estimate your home buying budget based on income, debts, down payment, and current mortgage rates.",
    inputs: [
      { label: "Annual Income", key: "annualIncome", type: "number", placeholder: "e.g., 100000", min: 1, step: 5000, defaultValue: 100000 },
      { label: "Monthly Debts", key: "monthlyDebts", type: "number", placeholder: "e.g., 500", min: 0, step: 50, defaultValue: 500 },
      { label: "Down Payment", key: "downPayment", type: "number", placeholder: "e.g., 50000", min: 0, step: 5000, defaultValue: 50000 },
      { label: "Interest Rate (%)", key: "interestRate", type: "number", placeholder: "e.g., 6.5", min: 0, max: 20, step: 0.1, defaultValue: 6.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 30", min: 1, max: 50, defaultValue: 30 },
      { label: "Property Tax Rate (%)", key: "propertyTaxRate", type: "number", placeholder: "e.g., 1.2", min: 0, max: 5, step: 0.1, defaultValue: 1.2 },
      { label: "Annual Insurance", key: "annualInsurance", type: "number", placeholder: "e.g., 1200", min: 0, step: 100, defaultValue: 1200 },
    ],
    compute: (inputs) => {
      const income = Number(inputs.annualIncome);
      const debts = Number(inputs.monthlyDebts);
      const down = Number(inputs.downPayment);
      const rate = Number(inputs.interestRate) / 100 / 12;
      const term = Number(inputs.loanTerm) * 12;
      const taxRate = Number(inputs.propertyTaxRate) / 100;
      const insurance = Number(inputs.annualInsurance) / 12;

      const maxPayment = income / 12 * 0.28 - debts;
      const maxDebtRatio = income / 12 * 0.36 - debts;
      const affordablePayment = Math.min(maxPayment, maxDebtRatio);

      const principal = affordablePayment > 0 ? affordablePayment * (Math.pow(1 + rate, term) - 1) / (rate * Math.pow(1 + rate, term)) : 0;
      const homePrice = principal + down;
      const monthlyPI = principal * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
      const monthlyTax = homePrice * taxRate / 12;
      const totalMonthly = monthlyPI + monthlyTax + insurance;

      const minDown = homePrice * 0.03;
      const recommendedIncome = totalMonthly * 12 / 0.28;

      return [
        { label: "Max Home Price", key: "homePrice", value: Math.round(homePrice * 100) / 100, unit: "$", color: "green" },
        { label: "Loan Amount", key: "loanAmount", value: Math.round(principal * 100) / 100, unit: "$", color: "blue" },
        { label: "Total Monthly Payment", key: "totalMonthly", value: Math.round(totalMonthly * 100) / 100, unit: "$/mo", color: "green" },
        { label: "Principal & Interest", key: "monthlyPI", value: Math.round(monthlyPI * 100) / 100, unit: "$/mo", color: "blue" },
        { label: "Property Tax", key: "monthlyTax", value: Math.round(monthlyTax * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "Insurance", key: "insuranceMonth", value: Math.round(insurance * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "Min Down Payment (3%)", key: "minDown", value: Math.round(minDown * 100) / 100, unit: "$", color: "default" },
        { label: "Recommended Income", key: "recommendedIncome", value: Math.round(recommendedIncome * 100) / 100, unit: "$/yr", color: "default" },
      ];
    },
    chart: (results) => {
      const pi = results.find(r => r.key === "monthlyPI")?.value as number || 0;
      const tax = results.find(r => r.key === "monthlyTax")?.value as number || 0;
      const ins = results.find(r => r.key === "insuranceMonth")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Principal & Interest", "Property Tax", "Insurance"],
          datasets: [{
            data: [pi, tax, ins],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { annualIncome: 100000, monthlyDebts: 500, downPayment: 50000, interestRate: 6.5, loanTerm: 30, propertyTaxRate: 1.2, annualInsurance: 1200 }, results: [] },
    faqs: [
      { question: "How much house can I afford?", answer: "Most lenders use the 28/36 rule: Your housing payment should not exceed 28% of your gross monthly income, and total debt payments should not exceed 36%." },
      { question: "What is the 28/36 rule?", answer: "The 28% front-end ratio means housing costs (PITI) should be under 28% of gross income. The 36% back-end ratio includes all debt payments." },
      { question: "How does my credit score affect affordability?", answer: "Higher credit scores qualify for lower interest rates, which increases how much house you can afford. A 760+ score gets the best rates." },
      { question: "What is PMI and how does it affect costs?", answer: "Private Mortgage Insurance is required when down payment is less than 20%. It typically costs 0.5-1% of the loan amount annually." },
      { question: "How much should I save for a down payment?", answer: "While 20% avoids PMI, many conventional loans accept as little as 3% down. FHA loans allow 3.5% down." },
      { question: "What are closing costs?", answer: "Closing costs are 2-5% of the home price and include appraisal, title insurance, origination fees, and prepaid taxes/insurance." },
      { question: "How does my debt-to-income ratio affect approval?", answer: "Lenders prefer DTI below 43%. A lower DTI means you can qualify for a larger loan and better rates." },
      { question: "Should I consider property taxes and insurance?", answer: "Yes, these are part of PITI (Principal, Interest, Taxes, Insurance) and are often escrowed into your monthly payment." },
    ],
    relatedSlugs: ["mortgage-calculator", "rent-vs-buy-calculator", "loan-calculator", "home-equity-loan-calculator"],
  },
  {
    icon: ArrowLeftRight,
    name: "Rent vs Buy Calculator",
    slug: "rent-vs-buy-calculator",
    category: "real-estate",
    description: "Compare renting and buying costs to determine which option is better for your financial situation.",
    metaTitle: "Rent vs Buy Calculator | Should You Rent or Buy a Home?",
    metaDescription: "Free rent vs buy calculator to compare costs of renting vs buying a home. Make an informed decision based on your financial situation.",
    inputs: [
      { label: "Home Price", key: "homePrice", type: "number", placeholder: "e.g., 350000", min: 1, step: 10000, defaultValue: 350000 },
      { label: "Down Payment %", key: "downPaymentPercent", type: "number", placeholder: "e.g., 20", min: 0, max: 100, step: 1, defaultValue: 20 },
      { label: "Mortgage Rate (%)", key: "mortgageRate", type: "number", placeholder: "e.g., 6.5", min: 0, max: 20, step: 0.1, defaultValue: 6.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 30", min: 1, max: 50, defaultValue: 30 },
      { label: "Monthly Rent", key: "monthlyRent", type: "number", placeholder: "e.g., 1800", min: 0, step: 100, defaultValue: 1800 },
      { label: "Annual Rent Increase (%)", key: "rentIncrease", type: "number", placeholder: "e.g., 3", min: 0, max: 20, step: 0.5, defaultValue: 3 },
      { label: "Time Horizon (Years)", key: "timeHorizon", type: "number", placeholder: "e.g., 7", min: 1, max: 50, defaultValue: 7 },
      { label: "Annual Investment Return (%)", key: "investmentReturn", type: "number", placeholder: "e.g., 7", min: 0, max: 30, step: 0.5, defaultValue: 7 },
    ],
    compute: (inputs) => {
      const homePrice = Number(inputs.homePrice);
      const downPct = Number(inputs.downPaymentPercent) / 100;
      const downPayment = homePrice * downPct;
      const loanAmount = homePrice - downPayment;
      const rate = Number(inputs.mortgageRate) / 100 / 12;
      const term = Number(inputs.loanTerm) * 12;
      const rent = Number(inputs.monthlyRent);
      const rentInc = Number(inputs.rentIncrease) / 100;
      const years = Number(inputs.timeHorizon);
      const invReturn = Number(inputs.investmentReturn) / 100 / 12;

      const monthlyPI = loanAmount * rate * Math.pow(1 + rate, term) / (Math.pow(1 + rate, term) - 1);
      const taxEst = homePrice * 0.012 / 12;
      const insuranceEst = 1200 / 12;
      const maintenanceEst = homePrice * 0.01 / 12;
      const totalBuyMonthly = monthlyPI + taxEst + insuranceEst + maintenanceEst;

      let totalBuyCost = downPayment;
      let remainingBalance = loanAmount;
      for (let i = 0; i < years * 12; i++) {
        const interestPortion = remainingBalance * rate;
        const principalPortion = monthlyPI - interestPortion;
        remainingBalance -= principalPortion;
        totalBuyCost += totalBuyMonthly;
      }
      const equity = homePrice - remainingBalance;
      const buyNetWorth = equity;

      let totalRentCost = 0;
      let currentRent = rent;
      for (let i = 0; i < years * 12; i++) {
        totalRentCost += currentRent;
        currentRent *= (1 + rentInc);
      }
      const savingsFromDownPayment = downPayment * Math.pow(1 + invReturn, years * 12);
      const savingsFromDiff = (totalBuyMonthly - rent > 0 ? 0 : (rent - totalBuyMonthly) * years * 12 * Math.pow(1 + invReturn, years * 12 / 2));
      const rentNetWorth = savingsFromDownPayment + savingsFromDiff - totalRentCost;

      const buyBetter = buyNetWorth > rentNetWorth;
      const diff = Math.abs(buyNetWorth - rentNetWorth);

      return [
        { label: "Buy - Monthly P&I", key: "monthlyPI", value: Math.round(monthlyPI * 100) / 100, unit: "$/mo", color: "blue" },
        { label: "Buy - Total Monthly", key: "totalBuyMonthly", value: Math.round(totalBuyMonthly * 100) / 100, unit: "$/mo", color: "green" },
        { label: "Rent - Monthly", key: "monthlyRent", value: Math.round(rent * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "Buy - Net Worth After", key: "buyNetWorth", value: Math.round(buyNetWorth * 100) / 100, unit: "$", color: "green" },
        { label: "Rent - Net Worth After", key: "rentNetWorth", value: Math.round(rentNetWorth * 100) / 100, unit: "$", color: "blue" },
        { label: buyBetter ? "Buying Saves" : "Renting Saves", key: "diff", value: Math.round(diff * 100) / 100, unit: "$", color: "green" },
        { label: "Remaining Loan Balance", key: "remainingBalance", value: Math.round(remainingBalance * 100) / 100, unit: "$", color: "default" },
      ];
    },
    chart: (results) => {
      const buyWorth = results.find(r => r.key === "buyNetWorth")?.value as number || 0;
      const rentWorth = results.find(r => r.key === "rentNetWorth")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Net Worth - Buying", "Net Worth - Renting"],
          datasets: [{
            label: "Net Worth After Investment",
            data: [buyWorth, rentWorth],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(99, 102, 241, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(99, 102, 241, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { homePrice: 350000, downPaymentPercent: 20, mortgageRate: 6.5, loanTerm: 30, monthlyRent: 1800, rentIncrease: 3, timeHorizon: 7, investmentReturn: 7 }, results: [] },
    faqs: [
      { question: "Is renting or buying better?", answer: "It depends on your time horizon, local market, interest rates, and personal finances. Generally, buying is better if you stay 5+ years." },
      { question: "What is the 5-year rule for buying?", answer: "The 5-year rule suggests that buying becomes more financially beneficial than renting after approximately 5 years due to transaction costs." },
      { question: "What are the hidden costs of buying?", answer: "Hidden costs include property taxes, insurance, maintenance (1% of home value/year), HOA fees, and closing costs (2-5% of price)." },
      { question: "What are the advantages of renting?", answer: "Renting offers flexibility, lower upfront costs, predictable monthly expenses, no maintenance costs, and easy relocation." },
      { question: "What are the advantages of buying?", answer: "Buying builds equity, offers tax benefits, provides stability, allows customization, and can appreciate over time." },
      { question: "How does the housing market affect my decision?", answer: "In rising markets, buying can build equity faster. In falling markets, renting protects you from value depreciation." },
      { question: "Should I consider opportunity cost of down payment?", answer: "Yes, a down payment could otherwise be invested. Our calculator accounts for potential investment returns on your down payment savings." },
      { question: "How does inflation affect renting vs buying?", answer: "With a fixed-rate mortgage, your housing payment stays stable while rent typically increases 3-5% annually, making buying increasingly attractive over time." },
    ],
    relatedSlugs: ["home-affordability-calculator", "mortgage-calculator", "loan-calculator"],
  },
  {
    icon: TrendingUp,
    name: "401(k) Retirement Calculator",
    slug: "401k",
    category: "retirement",
    description: "Estimate retirement savings growth and future value of your 401(k) contributions.",
    metaTitle: "401(k) Calculator | Retirement Savings Calculator | Measurely",
    metaDescription: "Free 401(k) retirement calculator. Estimate your retirement savings growth with employer match, contributions, and investment returns.",
    inputs: [
      { label: "Current Age", key: "currentAge", type: "number", placeholder: "e.g., 30", min: 18, max: 80, defaultValue: 30 },
      { label: "Retirement Age", key: "retirementAge", type: "number", placeholder: "e.g., 65", min: 30, max: 90, defaultValue: 65 },
      { label: "Current 401(k) Balance", key: "currentBalance", type: "number", placeholder: "e.g., 25000", min: 0, step: 1000, defaultValue: 25000 },
      { label: "Annual Salary", key: "annualSalary", type: "number", placeholder: "e.g., 75000", min: 1, step: 5000, defaultValue: 75000 },
      { label: "Your Contribution (%)", key: "yourContribution", type: "number", placeholder: "e.g., 10", min: 0, max: 100, step: 0.5, defaultValue: 10 },
      { label: "Employer Match (%)", key: "employerMatch", type: "number", placeholder: "e.g., 5", min: 0, max: 100, step: 0.5, defaultValue: 5 },
      { label: "Expected Annual Return (%)", key: "annualReturn", type: "number", placeholder: "e.g., 7", min: 0, max: 30, step: 0.5, defaultValue: 7 },
      { label: "Annual Salary Increase (%)", key: "salaryIncrease", type: "number", placeholder: "e.g., 3", min: 0, max: 20, step: 0.5, defaultValue: 3 },
    ],
    compute: (inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retirementAge = Number(inputs.retirementAge);
      const years = retirementAge - currentAge;
      const currentBalance = Number(inputs.currentBalance);
      const salary = Number(inputs.annualSalary);
      const yourPct = Number(inputs.yourContribution) / 100;
      const matchPct = Number(inputs.employerMatch) / 100;
      const annualReturn = Number(inputs.annualReturn) / 100;
      const salaryInc = Number(inputs.salaryIncrease) / 100;

      const monthlyReturn = annualReturn / 12;
      const totalMonths = years * 12;

      let balance = currentBalance;
      let totalYourContributions = 0;
      let totalEmployerContributions = 0;
      let currentSalary = salary;

      for (let m = 0; m < totalMonths; m++) {
        const yourMonthly = (currentSalary * yourPct) / 12;
        const employerMonthly = (currentSalary * matchPct) / 12;
        totalYourContributions += yourMonthly;
        totalEmployerContributions += employerMonthly;
        balance = (balance + yourMonthly + employerMonthly) * (1 + monthlyReturn);
        if ((m + 1) % 12 === 0) {
          currentSalary *= (1 + salaryInc);
        }
      }

      const totalContributions = totalYourContributions + totalEmployerContributions;
      const investmentGains = balance - currentBalance - totalContributions;
      const monthlyRetirementIncome = balance * 0.04 / 12;

      return [
        { label: "Balance at Retirement", key: "balanceAtRetirement", value: Math.round(balance * 100) / 100, unit: "$", color: "green" },
        { label: "Your Contributions", key: "yourTotal", value: Math.round(totalYourContributions * 100) / 100, unit: "$", color: "blue" },
        { label: "Employer Contributions", key: "employerTotal", value: Math.round(totalEmployerContributions * 100) / 100, unit: "$", color: "blue" },
        { label: "Investment Gains", key: "investmentGains", value: Math.round(investmentGains * 100) / 100, unit: "$", color: "green" },
        { label: "Monthly Income (4% Rule)", key: "monthlyIncome", value: Math.round(monthlyRetirementIncome * 100) / 100, unit: "$/mo", color: "green" },
      ];
    },
    chart: (results) => {
      const your = results.find(r => r.key === "yourTotal")?.value as number || 0;
      const employer = results.find(r => r.key === "employerTotal")?.value as number || 0;
      const gains = results.find(r => r.key === "investmentGains")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Your Contributions", "Employer Match", "Investment Gains"],
          datasets: [{
            data: [your, employer, gains],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { currentAge: 30, retirementAge: 65, currentBalance: 25000, annualSalary: 75000, yourContribution: 10, employerMatch: 5, annualReturn: 7, salaryIncrease: 3 }, results: [] },
    faqs: [
      { question: "What is a 401(k) plan?", answer: "A 401(k) is an employer-sponsored retirement savings plan that allows employees to contribute pre-tax or Roth dollars from their salary." },
      { question: "What is employer matching?", answer: "Employer matching is when your employer contributes additional money to your 401(k) based on your contributions, typically up to a certain percentage of your salary." },
      { question: "What is the 4% rule?", answer: "The 4% rule suggests withdrawing 4% of your retirement savings annually to provide income while preserving principal for 30 years." },
      { question: "What is the difference between traditional and Roth 401(k)?", answer: "Traditional 401(k) contributions are pre-tax (taxed on withdrawal). Roth 401(k) contributions are post-tax (tax-free withdrawals)." },
      { question: "What is the 2025 401(k) contribution limit?", answer: "For 2025, the employee contribution limit is $23,500 ($31,000 for age 50+ including catch-up)." },
      { question: "When can I withdraw from my 401(k) without penalty?", answer: "You can withdraw penalty-free after age 59. Additionally, some plans allow hardship withdrawals or loans." },
      { question: "What happens to my 401(k) if I change jobs?", answer: "You can roll it into your new employer's plan, roll into an IRA, leave it with your former employer, or cash out (subject to taxes and penalties)." },
      { question: "How much should I contribute to my 401(k)?", answer: "At minimum, contribute enough to get the full employer match. Aim for 10-15% of your income including the match for adequate retirement savings." },
    ],
    relatedSlugs: ["compound-interest-calculator", "sip-calculator", "roi-calculator"],
  },
  {
    icon: Zap,
    name: "EV Charging Cost Calculator",
    slug: "ev-charging-cost-calculator",
    category: "automotive",
    description: "Calculate the cost of charging electric vehicles at home or public charging stations.",
    metaTitle: "EV Charging Cost Calculator | Calculate Electric Vehicle Charging Costs",
    metaDescription: "Free EV charging cost calculator. Compare home vs public charging costs, calculate per-mile costs, and estimate monthly charging expenses.",
    inputs: [
      { label: "Vehicle Battery (kWh)", key: "batteryCapacity", type: "number", placeholder: "e.g., 75", min: 1, max: 250, step: 5, defaultValue: 75 },
      { label: "Current Charge (%)", key: "currentCharge", type: "number", placeholder: "e.g., 20", min: 0, max: 99, step: 5, defaultValue: 20 },
      { label: "Target Charge (%)", key: "targetCharge", type: "number", placeholder: "e.g., 80", min: 1, max: 100, step: 5, defaultValue: 80 },
      { label: "Home Electricity Rate ($/kWh)", key: "homeRate", type: "number", placeholder: "e.g., 0.14", min: 0.01, max: 1, step: 0.01, defaultValue: 0.14 },
      { label: "Public Charging Rate ($/kWh)", key: "publicRate", type: "number", placeholder: "e.g., 0.35", min: 0.01, max: 2, step: 0.01, defaultValue: 0.35 },
      { label: "Charger Efficiency (%)", key: "chargerEfficiency", type: "number", placeholder: "e.g., 90", min: 50, max: 100, step: 1, defaultValue: 90 },
      { label: "Miles per kWh", key: "efficiency", type: "number", placeholder: "e.g., 3.5", min: 0.5, max: 10, step: 0.1, defaultValue: 3.5 },
      { label: "Charges per Month", key: "chargesPerMonth", type: "number", placeholder: "e.g., 4", min: 1, max: 60, step: 1, defaultValue: 4 },
    ],
    compute: (inputs) => {
      const battery = Number(inputs.batteryCapacity);
      const currentPct = Number(inputs.currentCharge) / 100;
      const targetPct = Number(inputs.targetCharge) / 100;
      const homeRate = Number(inputs.homeRate);
      const publicRate = Number(inputs.publicRate);
      const efficiency = Number(inputs.chargerEfficiency) / 100;
      const milesPerKwh = Number(inputs.efficiency);
      const chargesPerMonth = Number(inputs.chargesPerMonth);

      const kwhNeeded = battery * (targetPct - currentPct);
      const kwhFromGrid = kwhNeeded / efficiency;

      const homeCost = kwhFromGrid * homeRate;
      const publicCost = kwhFromGrid * publicRate;
      const savings = publicCost - homeCost;

      const milesPerCharge = kwhNeeded * milesPerKwh;
      const homeCostPerMile = homeCost / milesPerCharge;
      const publicCostPerMile = publicCost / milesPerCharge;

      const monthlyHome = homeCost * chargesPerMonth;
      const monthlyPublic = publicCost * chargesPerMonth;
      const annualHome = monthlyHome * 12;
      const annualPublic = monthlyPublic * 12;

      return [
        { label: "Energy Needed", key: "kwhNeeded", value: Math.round(kwhNeeded * 100) / 100, unit: "kWh", color: "blue" },
        { label: "From Grid (with losses)", key: "kwhFromGrid", value: Math.round(kwhFromGrid * 100) / 100, unit: "kWh", color: "default" },
        { label: "Home Charging Cost", key: "homeCost", value: Math.round(homeCost * 100) / 100, unit: "$", color: "green" },
        { label: "Public Charging Cost", key: "publicCost", value: Math.round(publicCost * 100) / 100, unit: "$", color: "red" },
        { label: "Cost per Mile (Home)", key: "homeCostPerMile", value: Math.round(homeCostPerMile * 1000) / 1000, unit: "$/mi", color: "green" },
        { label: "Cost per Mile (Public)", key: "publicCostPerMile", value: Math.round(publicCostPerMile * 1000) / 1000, unit: "$/mi", color: "red" },
        { label: "Monthly Home Charging", key: "monthlyHome", value: Math.round(monthlyHome * 100) / 100, unit: "$/mo", color: "green" },
        { label: "Annual Home Charging", key: "annualHome", value: Math.round(annualHome * 100) / 100, unit: "$/yr", color: "green" },
      ];
    },
    chart: (results) => {
      const home = results.find(r => r.key === "homeCost")?.value as number || 0;
      const pub = results.find(r => r.key === "publicCost")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Home Charging", "Public Charging"],
          datasets: [{
            label: "Cost per Charge",
            data: [home, pub],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { batteryCapacity: 75, currentCharge: 20, targetCharge: 80, homeRate: 0.14, publicRate: 0.35, chargerEfficiency: 90, efficiency: 3.5, chargesPerMonth: 4 }, results: [] },
    faqs: [
      { question: "How much does it cost to charge an EV?", answer: "Home charging typically costs $0.10-$0.20 per kWh. For a 75 kWh battery charging from 20% to 80%, expect $6-$9 at home or $16-$22 at public stations." },
      { question: "Is home charging cheaper than public?", answer: "Yes, home charging is typically 50-70% cheaper than public fast charging, depending on your local electricity rates and the public charger pricing." },
      { question: "What affects EV charging efficiency?", answer: "Charging efficiency (typically 85-95%) is affected by temperature, charging speed, battery condition, and the charger type. L2 chargers are more efficient than L3 fast chargers." },
      { question: "How many miles do I get per kWh?", answer: "Most EVs achieve 3-4 miles per kWh. Smaller EVs can reach 5+, while larger trucks/SUVs may get 2-3 miles per kWh." },
      { question: "Should I charge to 100% every time?", answer: "For daily driving, charge to 80-90% to preserve battery health. Charge to 100% only for long trips, as frequent full charging accelerates battery degradation." },
      { question: "How do electricity rates affect charging costs?", answer: "Rates vary by location and time of day. Time-of-use plans offer lower rates overnight (as low as $0.08/kWh), making off-peak charging much cheaper." },
      { question: "What is the cost difference between Level 2 and DC fast charging?", answer: "Level 2 charging costs $0.10-$0.20/kWh at home. DC fast charging costs $0.30-$0.60/kWh. Fast charging is convenient but significantly more expensive." },
      { question: "How do I reduce EV charging costs?", answer: "Charge at home during off-peak hours, use solar panels, maintain proper tire pressure, drive efficiently, and minimize DC fast charging." },
    ],
    relatedSlugs: ["fuel-cost-calculator", "loan-calculator", "percentage-calculator"],
  },
  {
    icon: BarChart3,
    name: "YouTube Money Calculator",
    slug: "youtube-money-calculator",
    category: "social-media",
    description: "Estimate YouTube earnings based on views, RPM, CPM, and engagement.",
    metaTitle: "YouTube Money Calculator | Estimate YouTube Earnings & Revenue",
    metaDescription: "Free YouTube money calculator. Estimate your YouTube channel earnings based on views, RPM, CPM rates, and monthly engagement metrics.",
    inputs: [
      { label: "Monthly Views", key: "monthlyViews", type: "number", placeholder: "e.g., 100000", min: 100, step: 1000, defaultValue: 100000 },
      { label: "CPM ($)", key: "cpm", type: "number", placeholder: "e.g., 4.00", min: 0.1, max: 100, step: 0.5, defaultValue: 4 },
      { label: "RPM ($)", key: "rpm", type: "number", placeholder: "e.g., 2.50", min: 0.1, max: 50, step: 0.5, defaultValue: 2.5 },
      { label: "CTR (%)", key: "ctr", type: "number", placeholder: "e.g., 5", min: 0.1, max: 50, step: 0.5, defaultValue: 5 },
      { label: "Video Length (min)", key: "videoLength", type: "number", placeholder: "e.g., 10", min: 1, max: 120, step: 1, defaultValue: 10 },
      { label: "Videos per Month", key: "videosPerMonth", type: "number", placeholder: "e.g., 8", min: 1, max: 100, step: 1, defaultValue: 8 },
    ],
    compute: (inputs) => {
      const monthlyViews = Number(inputs.monthlyViews);
      const cpm = Number(inputs.cpm);
      const rpm = Number(inputs.rpm);
      const ctr = Number(inputs.ctr) / 100;
      const videoLength = Number(inputs.videoLength);
      const videosPerMonth = Number(inputs.videosPerMonth);

      const adRevenue = (monthlyViews / 1000) * rpm;
      const cpmRevenue = (monthlyViews / 1000) * cpm;
      const estimatedAdViews = monthlyViews * ctr;
      const adViewRevenue = (estimatedAdViews / 1000) * cpm;

      const dailyViews = monthlyViews / 30;
      const yearlyViews = monthlyViews * 12;
      const monthlyEarnings = adRevenue;
      const yearlyEarnings = monthlyEarnings * 12;
      const earningsPerVideo = monthlyEarnings / videosPerMonth;

      const lowEstimate = monthlyEarnings * 0.8;
      const highEstimate = monthlyEarnings * 1.2;

      const revenueShare = monthlyEarnings * 0.7;
      const netAfterTax = monthlyEarnings * 0.7;

      return [
        { label: "Monthly Revenue (RPM)", key: "monthlyRPM", value: Math.round(monthlyEarnings * 100) / 100, unit: "$", color: "green" },
        { label: "Yearly Revenue", key: "yearlyRevenue", value: Math.round(yearlyEarnings * 100) / 100, unit: "$", color: "green" },
        { label: "Revenue per Video", key: "perVideo", value: Math.round(earningsPerVideo * 100) / 100, unit: "$", color: "blue" },
        { label: "Low Estimate", key: "lowEstimate", value: Math.round(lowEstimate * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "High Estimate", key: "highEstimate", value: Math.round(highEstimate * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "Estimated Daily Views", key: "dailyViews", value: Math.round(dailyViews), color: "default" },
        { label: "Estimated Yearly Views", key: "yearlyViews", value: Math.round(yearlyViews), color: "default" },
        { label: "Net After 30% Tax/Expenses", key: "netAfterTax", value: Math.round(netAfterTax * 100) / 100, unit: "$/mo", color: "green" },
      ];
    },
    chart: (results) => {
      const yearly = results.find(r => r.key === "yearlyRevenue")?.value as number || 0;
      const perVideo = results.find(r => r.key === "perVideo")?.value as number || 0;
      const low = results.find(r => r.key === "lowEstimate")?.value as number || 0;
      const high = results.find(r => r.key === "highEstimate")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Per Video", "Low (Monthly)", "High (Monthly)", "Yearly"],
          datasets: [{
            label: "YouTube Revenue ($)",
            data: [perVideo, low, high, yearly],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { monthlyViews: 100000, cpm: 4, rpm: 2.5, ctr: 5, videoLength: 10, videosPerMonth: 8 }, results: [] },
    faqs: [
      { question: "How does YouTube pay creators?", answer: "YouTube pays creators through ad revenue shared from the YouTube Partner Program, typically 55% for the creator and 45% for YouTube." },
      { question: "What is CPM?", answer: "CPM (Cost Per Mille) is the amount advertisers pay per 1,000 ad impressions. It varies by niche, season, and audience location." },
      { question: "What is RPM?", answer: "RPM (Revenue Per Mille) is your actual earnings per 1,000 views after YouTubes cut. RPM is typically 40-60% of CPM." },
      { question: "How many views do I need to make money on YouTube?", answer: "You need 1,000 subscribers and 4,000 watch hours to join YPP. After that, at $2.50 RPM, 100,000 monthly views earns about $250/month." },
      { question: "Which niches have the highest CPM?", answer: "Finance, business, technology, and education niches have the highest CPM rates ($10-$30+), while entertainment and gaming have lower rates ($1-$5)." },
      { question: "How does video length affect earnings?", answer: "Videos over 8 minutes allow mid-roll ads, which significantly increase ad revenue. Adding 2-3 mid-roll ads can double your earnings per video." },
      { question: "Do YouTube Shorts pay well?", answer: "Shorts pay less than long-form content. The Shorts Fund and ad revenue sharing for Shorts typically pays $0.01-$0.06 per 1,000 views." },
      { question: "How can I increase my YouTube revenue?", answer: "Increase video length for mid-roll ads, optimize for higher CPM topics, improve CTR with better thumbnails/titles, upload consistently, and diversify income streams." },
    ],
    relatedSlugs: ["roi-calculator", "percentage-calculator", "freelance-rate-calculator"],
  },
  {
    icon: TrendingUp,
    name: "ROI Calculator",
    slug: "roi-calculator",
    category: "business",
    description: "Measure return on investment and calculate profit percentages for business and investments.",
    metaTitle: "ROI Calculator | Calculate Return on Investment Online",
    metaDescription: "Free ROI calculator to measure return on investment. Calculate ROI percentage, net profit, annualized return, and compare investment performance.",
    inputs: [
      { label: "Initial Investment", key: "initialInvestment", type: "number", placeholder: "e.g., 10000", min: 1, step: 500, defaultValue: 10000 },
      { label: "Final Value", key: "finalValue", type: "number", placeholder: "e.g., 15000", min: 1, step: 500, defaultValue: 15000 },
      { label: "Additional Costs", key: "additionalCosts", type: "number", placeholder: "e.g., 500", min: 0, step: 100, defaultValue: 500 },
      { label: "Time Period (Years)", key: "timePeriod", type: "number", placeholder: "e.g., 3", min: 0.1, max: 100, step: 0.5, defaultValue: 3 },
    ],
    compute: (inputs) => {
      const initial = Number(inputs.initialInvestment);
      const final = Number(inputs.finalValue);
      const costs = Number(inputs.additionalCosts);
      const years = Number(inputs.timePeriod);

      const totalInvestment = initial + costs;
      const netProfit = final - totalInvestment;
      const roi = (netProfit / totalInvestment) * 100;
      const annualizedROI = (Math.pow(final / totalInvestment, 1 / years) - 1) * 100;
      const gainLossRatio = final / totalInvestment;

      return [
        { label: "Total Investment", key: "totalInvestment", value: Math.round(totalInvestment * 100) / 100, unit: "$", color: "red" },
        { label: "Net Profit", key: "netProfit", value: Math.round(netProfit * 100) / 100, unit: "$", color: netProfit >= 0 ? "green" : "red" },
        { label: "ROI", key: "roi", value: Math.round(roi * 100) / 100, unit: "%", color: roi >= 0 ? "green" : "red" },
        { label: "Annualized ROI", key: "annualizedROI", value: Math.round(annualizedROI * 100) / 100, unit: "%", color: annualizedROI >= 0 ? "green" : "red" },
        { label: "Gain/Loss Ratio", key: "gainLossRatio", value: Math.round(gainLossRatio * 100) / 100, color: gainLossRatio >= 1 ? "green" : "red" },
      ];
    },
    chart: (results) => {
      const total = results.find(r => r.key === "totalInvestment")?.value as number || 0;
      const profit = results.find(r => r.key === "netProfit")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Investment", "Profit/Loss"],
          datasets: [{
            data: [total, profit > 0 ? profit : 0],
            backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(239, 68, 68, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { initialInvestment: 10000, finalValue: 15000, additionalCosts: 500, timePeriod: 3 }, results: [] },
    faqs: [
      { question: "What is ROI?", answer: "Return on Investment (ROI) measures the profitability of an investment as a percentage of the amount invested. It is calculated as (Net Profit / Total Investment) x 100." },
      { question: "What is a good ROI?", answer: "A good ROI depends on the investment type. Generally, stock market average ROI is 7-10% annually. Real estate averages 8-12%. Business investments should aim for 15%+." },
      { question: "What is annualized ROI?", answer: "Annualized ROI adjusts the total ROI to an annual rate, accounting for the investment period. This allows fair comparison between investments of different durations." },
      { question: "How do I calculate ROI for marketing campaigns?", answer: "Marketing ROI = (Revenue from Campaign - Campaign Cost) / Campaign Cost x 100. Track conversions and attribute revenue to specific campaigns." },
      { question: "What is the difference between ROI and ROAS?", answer: "ROI measures overall return including all costs. ROAS (Return on Ad Spend) only measures revenue against ad spend, excluding other costs." },
      { question: "Can ROI be negative?", answer: "Yes, a negative ROI means the investment lost money. This happens when the final value plus returns are less than the total amount invested." },
      { question: "How does time affect ROI?", answer: "Longer time periods can increase absolute returns but may reduce annualized ROI. Annualized ROI helps normalize returns across different time periods for fair comparison." },
      { question: "What costs should I include in ROI calculation?", answer: "Include all direct costs: purchase price, transaction fees, maintenance, taxes, improvement costs, and any other expenses directly related to the investment." },
    ],
    relatedSlugs: ["compound-interest-calculator", "youtube-money-calculator", "freelance-rate-calculator"],
  },
  {
    icon: HandCoins,
    name: "Freelance Rate Calculator",
    slug: "freelance-rate-calculator",
    category: "business",
    description: "Determine your ideal hourly and project rates based on expenses, taxes, and desired income.",
    metaTitle: "Freelance Rate Calculator | How to Price Your Services",
    metaDescription: "Free freelance rate calculator to determine your ideal hourly, daily, and project rates based on expenses, taxes, and income goals.",
    inputs: [
      { label: "Desired Annual Income", key: "desiredIncome", type: "number", placeholder: "e.g., 100000", min: 1, step: 5000, defaultValue: 100000 },
      { label: "Business Expenses (Annual)", key: "businessExpenses", type: "number", placeholder: "e.g., 15000", min: 0, step: 1000, defaultValue: 15000 },
      { label: "Tax Rate (%)", key: "taxRate", type: "number", placeholder: "e.g., 25", min: 0, max: 60, step: 1, defaultValue: 25 },
      { label: "Billable Hours per Week", key: "billableHours", type: "number", placeholder: "e.g., 25", min: 1, max: 60, step: 1, defaultValue: 25 },
      { label: "Vacation Weeks per Year", key: "vacationWeeks", type: "number", placeholder: "e.g., 4", min: 0, max: 20, step: 1, defaultValue: 4 },
      { label: "Overhead %", key: "overheadPercent", type: "number", placeholder: "e.g., 20", min: 0, max: 100, step: 5, defaultValue: 20 },
    ],
    compute: (inputs) => {
      const desiredIncome = Number(inputs.desiredIncome);
      const expenses = Number(inputs.businessExpenses);
      const taxRate = Number(inputs.taxRate) / 100;
      const billableHours = Number(inputs.billableHours);
      const vacationWeeks = Number(inputs.vacationWeeks);
      const overhead = Number(inputs.overheadPercent) / 100;

      const totalWeeks = 52 - vacationWeeks;
      const annualBillableHours = billableHours * totalWeeks;
      const preTaxIncome = desiredIncome / (1 - taxRate);
      const totalRevenueNeeded = preTaxIncome + expenses;
      const withOverhead = totalRevenueNeeded * (1 + overhead);

      const hourlyRate = withOverhead / annualBillableHours;
      const dailyRate = hourlyRate * 8;
      const weeklyRate = hourlyRate * billableHours;
      const monthlyRate = hourlyRate * annualBillableHours / 12;

      const afterTaxHourly = (withOverhead * (1 - taxRate) - expenses) / annualBillableHours;

      return [
        { label: "Hourly Rate", key: "hourlyRate", value: Math.round(hourlyRate * 100) / 100, unit: "$/hr", color: "green" },
        { label: "Daily Rate (8 hrs)", key: "dailyRate", value: Math.round(dailyRate * 100) / 100, unit: "$/day", color: "green" },
        { label: "Weekly Rate", key: "weeklyRate", value: Math.round(weeklyRate * 100) / 100, unit: "$/wk", color: "blue" },
        { label: "Monthly Target", key: "monthlyRate", value: Math.round(monthlyRate * 100) / 100, unit: "$/mo", color: "blue" },
        { label: "Annual Billable Hours", key: "annualBillableHours", value: Math.round(annualBillableHours), color: "default" },
        { label: "Total Revenue Needed", key: "totalRevenue", value: Math.round(totalRevenueNeeded * 100) / 100, unit: "$", color: "red" },
      ];
    },
    chart: (results) => {
      const hourly = results.find(r => r.key === "hourlyRate")?.value as number || 0;
      const daily = results.find(r => r.key === "dailyRate")?.value as number || 0;
      const weekly = results.find(r => r.key === "weeklyRate")?.value as number || 0;
      const monthly = results.find(r => r.key === "monthlyRate")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Hourly", "Daily", "Weekly", "Monthly"],
          datasets: [{
            label: "Rate",
            data: [hourly, daily / 8, weekly / 40 * 8, monthly / 160 * 8],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { desiredIncome: 100000, businessExpenses: 15000, taxRate: 25, billableHours: 25, vacationWeeks: 4, overheadPercent: 20 }, results: [] },
    faqs: [
      { question: "How do I determine my freelance rate?", answer: "Start with your desired annual income, add business expenses and taxes, account for non-billable time and overhead, then divide by billable hours." },
      { question: "How many hours should I bill per week?", answer: "Most freelancers bill 20-30 hours per week. The rest is spent on admin, marketing, proposals, and professional development." },
      { question: "What expenses should freelancers track?", answer: "Software subscriptions, equipment, home office, internet, insurance, marketing, travel, education, professional services, and retirement contributions." },
      { question: "How do taxes work for freelancers?", answer: "Freelancers pay self-employment tax (15.3%) plus income tax. Set aside 25-35% of income for taxes. Quarterly estimated payments are required." },
      { question: "Should I charge hourly or per project?", answer: "Project-based pricing is often better as it values your expertise, not your time. Use hourly rates as a baseline to calculate project minimums." },
      { question: "How often should I raise my rates?", answer: "Review rates annually or when your skills/experience significantly increase. A 10-20% increase every 1-2 years is standard as you gain expertise." },
      { question: "What is the overhead percentage for freelancers?", answer: "Overhead typically runs 15-30% of revenue, including non-billable time, software, equipment depreciation, insurance, and administrative costs." },
      { question: "How do I negotiate rates with clients?", answer: "Know your minimum acceptable rate, communicate value over price, offer tiered packages, and be willing to walk away from low-ball offers." },
    ],
    relatedSlugs: ["roi-calculator", "salary-calculator", "tax-calculator"],
  },
  {
    icon: Landmark,
    name: "TFSA Contribution Room Calculator Canada",
    slug: "tfsa-contribution-room-calculator-canada",
    category: "finance",
    description: "Calculate your available TFSA contribution room including annual limits, cumulative room, and remaining contribution space.",
    metaTitle: "TFSA Contribution Room Calculator Canada | Measurely",
    metaDescription: "Free TFSA contribution room calculator for Canada. Calculate your available room based on age, contribution history, and withdrawals. Accurate up-to-date annual limits.",
    inputs: [
      { label: "Year of Birth", key: "birthYear", type: "number", placeholder: "e.g., 1990", min: 1920, max: 2010, step: 1, defaultValue: 1990 },
      { label: "Year of First TFSA Contribution", key: "firstContributionYear", type: "number", placeholder: "e.g., 2015", min: 2009, max: 2027, step: 1, defaultValue: 2015 },
      { label: "Total Contributions Made to Date ($)", key: "totalContributionsMade", type: "number", placeholder: "e.g., 35000", min: 0, step: 1000, defaultValue: 35000 },
      { label: "Withdrawals Made in Previous Year ($)", key: "previousYearWithdrawals", type: "number", placeholder: "e.g., 5000", min: 0, step: 1000, defaultValue: 5000 },
    ],
    compute: (inputs) => {
      const birthYear = Number(inputs.birthYear);
      const firstContributionYear = Number(inputs.firstContributionYear);
      const totalContributions = Number(inputs.totalContributionsMade);
      const withdrawals = Number(inputs.previousYearWithdrawals);
      const currentYear = 2026;
      const yearTurned18 = birthYear + 18;
      const startYear = Math.max(2009, yearTurned18);
      const limits: Record<number, number> = {
        2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000,
        2013: 5500, 2014: 5500, 2015: 10000,
        2016: 5500, 2017: 5500, 2018: 5500,
        2019: 6000, 2020: 6000, 2021: 6000, 2022: 6000,
        2023: 6500, 2024: 7000, 2025: 7000, 2026: 7000,
      };
      let totalRoom = 0;
      const yearData: { year: number; limit: number; cumulative: number }[] = [];
      for (let year = startYear; year <= currentYear; year++) {
        if (limits[year] !== undefined) {
          totalRoom += limits[year];
          yearData.push({ year, limit: limits[year], cumulative: totalRoom });
        }
      }
      const remainingRoom = totalRoom - totalContributions + withdrawals;
      return [
        { label: "Total Contribution Room", key: "totalRoom", value: totalRoom, unit: "$", color: "blue" },
        { label: "Total Contributions Made", key: "totalContributions", value: totalContributions, unit: "$", color: "amber" },
        { label: "Previous Year Withdrawals Added Back", key: "withdrawals", value: withdrawals, unit: "$", color: "green" },
        { label: "Remaining Contribution Room", key: "remainingRoom", value: Math.max(0, remainingRoom), unit: "$", color: "green" },
        { label: "Amount You Can Contribute Today", key: "canContribute", value: Math.max(0, remainingRoom), unit: "$", color: "green" },
      ];
    },
    chart: (results, inputs) => {
      const birthYear = Number(inputs.birthYear);
      const currentYear = 2026;
      const yearTurned18 = birthYear + 18;
      const startYear = Math.max(2009, yearTurned18);
      const limits: Record<number, number> = {
        2009: 5000, 2010: 5000, 2011: 5000, 2012: 5000,
        2013: 5500, 2014: 5500, 2015: 10000,
        2016: 5500, 2017: 5500, 2018: 5500,
        2019: 6000, 2020: 6000, 2021: 6000, 2022: 6000,
        2023: 6500, 2024: 7000, 2025: 7000, 2026: 7000,
      };
      const labels: string[] = [];
      const annualData: number[] = [];
      const cumulativeData: number[] = [];
      let cumulative = 0;
      for (let year = startYear; year <= currentYear; year++) {
        if (limits[year] !== undefined) {
          labels.push(String(year));
          annualData.push(limits[year]);
          cumulative += limits[year];
          cumulativeData.push(cumulative);
        }
      }
      return {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Annual Limit ($)",
              data: annualData,
              backgroundColor: "rgba(99, 102, 241, 0.8)",
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 2,
              borderRadius: 4,
            },
            {
              label: "Cumulative Room ($)",
              data: cumulativeData,
              backgroundColor: "rgba(34, 197, 94, 0.4)",
              borderColor: "rgba(34, 197, 94, 1)",
              borderWidth: 2,
              borderRadius: 4,
              type: "line" as const,
            },
          ],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { birthYear: 1990, firstContributionYear: 2015, totalContributionsMade: 35000, previousYearWithdrawals: 5000 }, results: [] },
    faqs: [
      { question: "How is TFSA contribution room calculated?", answer: "Your TFSA room accumulates each year starting from the year you turn 18 (or 2009, whichever is later). Unused room carries forward indefinitely. Withdrawals are added back to your room the following calendar year." },
      { question: "What is the total TFSA contribution room for 2026?", answer: "For someone 18+ since 2009 with no prior contributions, the cumulative room through 2026 is approximately $109,000. The 2026 annual limit is $7,000." },
      { question: "What happens if I over-contribute to my TFSA?", answer: "Over-contributions are subject to a 1% per month penalty tax on the excess amount. The CRA allows a lifetime over-contribution buffer of $2,000." },
      { question: "Do TFSA withdrawals affect my contribution room?", answer: "Yes, any amount withdrawn from your TFSA is added back to your contribution room at the beginning of the following calendar year. This makes TFSA flexible for short-term saving." },
      { question: "What is the TFSA annual limit for 2025 and 2026?", answer: "The TFSA annual limit is $7,000 for both 2025 and 2026. The cumulative contribution room for someone eligible since 2009 is $102,000 through 2025 and $109,000 through 2026." },
      { question: "Can I have multiple TFSA accounts?", answer: "Yes, you can have multiple TFSA accounts at different financial institutions, but your total contributions across all accounts cannot exceed your available contribution room." },
      { question: "What happens to my TFSA when I die?", answer: "TFSA assets can be transferred to a surviving spouse or common-law partner on a tax-free basis. Otherwise, the account is deemed disposed of and any gains are taxed." },
      { question: "Are TFSA investment gains taxable?", answer: "No, any income earned inside a TFSA (interest, dividends, capital gains) is tax-free, even when withdrawn. This is the key advantage of TFSAs over non-registered accounts." },
    ],
    relatedSlugs: ["rrsp-contribution-tax-savings-calculator", "compound-interest-calculator", "canada-child-benefit-calculator-by-income", "salary-calculator"],
  },
  {
    icon: PiggyBank,
    name: "RRSP Contribution Tax Savings Calculator",
    slug: "rrsp-contribution-tax-savings-calculator",
    category: "finance",
    description: "Calculate your tax savings from RRSP contributions based on your income, marginal tax rate, and contribution amount.",
    metaTitle: "RRSP Contribution Tax Savings Calculator | Measurely",
    metaDescription: "Free RRSP contribution tax savings calculator for Canada. See how much tax you'll save with your RRSP contribution using federal and Ontario marginal tax rates.",
    inputs: [
      { label: "Annual Income ($)", key: "annualIncome", type: "number", placeholder: "e.g., 80000", min: 1, step: 1000, defaultValue: 80000 },
      { label: "RRSP Contribution Amount ($)", key: "contributionAmount", type: "number", placeholder: "e.g., 10000", min: 0, step: 500, defaultValue: 10000 },
      { label: "Province", key: "province", type: "select", options: [{ label: "Ontario", value: "ontario" }, { label: "British Columbia", value: "bc" }, { label: "Alberta", value: "ab" }, { label: "Quebec", value: "qc" }, { label: "Manitoba", value: "mb" }, { label: "Saskatchewan", value: "sk" }, { label: "Nova Scotia", value: "ns" }, { label: "New Brunswick", value: "nb" }, { label: "Newfoundland and Labrador", value: "nl" }, { label: "Prince Edward Island", value: "pe" }], defaultValue: "ontario" },
      { label: "Employment Type", key: "employmentType", type: "select", options: [{ label: "Employed", value: "employed" }, { label: "Self-Employed", value: "self-employed" }], defaultValue: "employed" },
    ],
    compute: (inputs) => {
      const income = Number(inputs.annualIncome);
      const contribution = Number(inputs.contributionAmount);
      const rrspLimit = Math.min(income * 0.18, 32490);
      const usableContribution = Math.min(contribution, rrspLimit);
      const calculateTax = (taxableIncome: number, brackets: { min: number; max: number; rate: number }[]): number => {
        let tax = 0;
        for (const b of brackets) {
          const taxableInBracket = Math.min(Math.max(taxableIncome - b.min, 0), b.max - b.min);
          tax += taxableInBracket * b.rate;
        }
        return tax;
      };
      const getMarginalRate = (taxableIncome: number, brackets: { min: number; max: number; rate: number }[]): number => {
        for (const b of brackets) {
          if (taxableIncome > b.min && taxableIncome <= b.max) return b.rate;
        }
        return brackets[brackets.length - 1].rate;
      };
      const federalBrackets = [
        { min: 0, max: 57375, rate: 0.15 },
        { min: 57375, max: 114750, rate: 0.205 },
        { min: 114750, max: 177882, rate: 0.26 },
        { min: 177882, max: 253414, rate: 0.29 },
        { min: 253414, max: Infinity, rate: 0.33 },
      ];
      const ontarioBrackets = [
        { min: 0, max: 51446, rate: 0.0505 },
        { min: 51446, max: 102894, rate: 0.0915 },
        { min: 102894, max: 150000, rate: 0.1116 },
        { min: 150000, max: 220000, rate: 0.1216 },
        { min: 220000, max: Infinity, rate: 0.1316 },
      ];
      const federalBPA = 15705;
      const ontarioBPA = 12843;
      const taxableIncome = Math.max(0, income - federalBPA);
      const ontarioTaxableIncome = Math.max(0, income - ontarioBPA);
      const taxWithoutFederal = calculateTax(taxableIncome, federalBrackets);
      const taxWithFederal = calculateTax(Math.max(0, taxableIncome - usableContribution), federalBrackets);
      const federalSavings = taxWithoutFederal - taxWithFederal;
      const taxWithoutOntario = calculateTax(ontarioTaxableIncome, ontarioBrackets);
      const taxWithOntario = calculateTax(Math.max(0, ontarioTaxableIncome - usableContribution), ontarioBrackets);
      const ontarioSavings = taxWithoutOntario - taxWithOntario;
      const totalSavings = federalSavings + ontarioSavings;
      const marginalFederal = getMarginalRate(taxableIncome, federalBrackets);
      const marginalOntario = getMarginalRate(ontarioTaxableIncome, ontarioBrackets);
      const combinedMarginalRate = marginalFederal + marginalOntario;
      const afterTaxCost = usableContribution - totalSavings;
      return [
        { label: "RRSP Contribution Amount", key: "contributionAmount", value: usableContribution, unit: "$", color: "blue" },
        { label: "RRSP Deduction Limit", key: "rrspLimit", value: rrspLimit, unit: "$", color: "default" },
        { label: "Federal Tax Savings", key: "federalSavings", value: Math.round(federalSavings * 100) / 100, unit: "$", color: "green" },
        { label: "Provincial Tax Savings (Ontario)", key: "provincialSavings", value: Math.round(ontarioSavings * 100) / 100, unit: "$", color: "green" },
        { label: "Total Tax Savings This Year", key: "totalSavings", value: Math.round(totalSavings * 100) / 100, unit: "$", color: "green" },
        { label: "Combined Marginal Tax Rate", key: "marginalRate", value: Math.round(combinedMarginalRate * 10000) / 100, unit: "%", color: "blue" },
        { label: "After-Tax Cost of Contribution", key: "afterTaxCost", value: Math.round(afterTaxCost * 100) / 100, unit: "$", color: "blue" },
      ];
    },
    chart: (results) => {
      const federal = results.find(r => r.key === "federalSavings")?.value as number || 0;
      const provincial = results.find(r => r.key === "provincialSavings")?.value as number || 0;
      const cost = results.find(r => r.key === "afterTaxCost")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Federal Tax Savings", "Provincial Tax Savings", "After-Tax Cost"],
          datasets: [{
            data: [federal, provincial, cost],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { annualIncome: 80000, contributionAmount: 10000, province: "ontario", employmentType: "employed" }, results: [] },
    faqs: [
      { question: "How much tax will I save by contributing to my RRSP?", answer: "Your tax savings equal your RRSP contribution multiplied by your marginal tax rate. For example, a $10,000 contribution at a 29.65% marginal rate saves you $2,965 in taxes." },
      { question: "What is the 2025 RRSP contribution limit?", answer: "The 2025 RRSP contribution limit is $32,490, which is 18% of your 2024 earned income, whichever is lower. The 2026 limit is approximately $34,000." },
      { question: "What happens if I contribute more than my RRSP limit?", answer: "Excess RRSP contributions exceeding your deduction limit by more than $2,000 are subject to a 1% per month penalty tax on the excess amount." },
      { question: "What is the difference between RRSP and TFSA?", answer: "RRSP contributions are tax-deductible but withdrawals are taxed as income. TFSA contributions are after-tax but withdrawals are tax-free. RRSP is better for high earners; TFSA is better for lower earners." },
      { question: "Can I carry forward unused RRSP contribution room?", answer: "Yes, unused RRSP contribution room carries forward indefinitely. You can also carry forward unused deductions to future years without penalty." },
      { question: "How does self-employment affect RRSP contribution room?", answer: "Self-employed individuals earn RRSP room based on their net business income. The same 18% rule applies. RRSPs are especially beneficial for self-employed as there is no employer pension plan." },
      { question: "When should I make my RRSP contribution for the 2025 tax year?", answer: "You have until March 2, 2026 (60 days after year-end) to make RRSP contributions that count toward your 2025 tax deduction." },
      { question: "What is the spousal RRSP and how does it work?", answer: "A spousal RRSP allows a higher-earning spouse to contribute to a plan in their lower-earning partner's name, enabling income splitting in retirement. The contributor gets the tax deduction." },
    ],
    relatedSlugs: ["tfsa-contribution-room-calculator-canada", "ontario-take-home-pay-calculator-after-tax", "compound-interest-calculator", "salary-calculator", "tax-calculator"],
  },
  {
    icon: Banknote,
    name: "Ontario Take Home Pay Calculator After Tax",
    slug: "ontario-take-home-pay-calculator-after-tax",
    category: "finance",
    description: "Calculate your net take-home pay after CPP, EI, federal tax, and Ontario provincial tax deductions.",
    metaTitle: "Ontario Take Home Pay Calculator After Tax 2025 | Measurely",
    metaDescription: "Free Ontario take-home pay calculator for 2025. Calculate your net salary after federal and provincial taxes, CPP, and EI deductions. Accurate Ontario tax brackets and rates.",
    inputs: [
      { label: "Annual Salary ($)", key: "annualSalary", type: "number", placeholder: "e.g., 75000", min: 1, step: 1000, defaultValue: 75000 },
      { label: "Pay Frequency", key: "payFrequency", type: "select", options: [{ label: "Monthly (12/year)", value: "monthly" }, { label: "Semi-Monthly (24/year)", value: "semi-monthly" }, { label: "Bi-Weekly (26/year)", value: "bi-weekly" }, { label: "Weekly (52/year)", value: "weekly" }], defaultValue: "semi-monthly" },
    ],
    compute: (inputs) => {
      const salary = Number(inputs.annualSalary);
      const frequency = String(inputs.payFrequency);
      const cppRate = 0.0595;
      const cppExemption = 3500;
      const cppMaxPensionable = 71300;
      const cppMaxContribution = (cppMaxPensionable - cppExemption) * cppRate;
      const cppAnnual = Math.min(Math.max(0, salary - cppExemption) * cppRate, cppMaxContribution);
      const eiRate = 0.0164;
      const eiMaxInsurable = 56300;
      const eiMaxContribution = eiMaxInsurable * eiRate;
      const eiAnnual = Math.min(salary * eiRate, eiMaxContribution);
      const calculateTax = (taxableIncome: number, brackets: { min: number; max: number; rate: number }[]): number => {
        let tax = 0;
        for (const b of brackets) {
          const taxableInBracket = Math.min(Math.max(taxableIncome - b.min, 0), b.max - b.min);
          tax += taxableInBracket * b.rate;
        }
        return tax;
      };
      const getMarginalRate = (taxableIncome: number, brackets: { min: number; max: number; rate: number }[]): number => {
        for (const b of brackets) {
          if (taxableIncome > b.min && taxableIncome <= b.max) return b.rate;
        }
        return brackets[brackets.length - 1].rate;
      };
      const federalBrackets = [
        { min: 0, max: 57375, rate: 0.15 },
        { min: 57375, max: 114750, rate: 0.205 },
        { min: 114750, max: 177882, rate: 0.26 },
        { min: 177882, max: 253414, rate: 0.29 },
        { min: 253414, max: Infinity, rate: 0.33 },
      ];
      const ontarioBrackets = [
        { min: 0, max: 51446, rate: 0.0505 },
        { min: 51446, max: 102894, rate: 0.0915 },
        { min: 102894, max: 150000, rate: 0.1116 },
        { min: 150000, max: 220000, rate: 0.1216 },
        { min: 220000, max: Infinity, rate: 0.1316 },
      ];
      const federalBPA = 15705;
      const ontarioBPA = 12843;
      const federalTaxable = Math.max(0, salary - federalBPA);
      const ontarioTaxable = Math.max(0, salary - ontarioBPA);
      const federalTax = calculateTax(federalTaxable, federalBrackets);
      const ontarioTax = calculateTax(ontarioTaxable, ontarioBrackets);
      const totalDeductions = cppAnnual + eiAnnual + federalTax + ontarioTax;
      const annualNetPay = salary - totalDeductions;
      const periodMap: Record<string, number> = { monthly: 12, "semi-monthly": 24, "bi-weekly": 26, weekly: 52 };
      const periods = periodMap[frequency] || 12;
      const grossPeriod = salary / periods;
      const cppPeriod = cppAnnual / periods;
      const eiPeriod = eiAnnual / periods;
      const federalPeriod = federalTax / periods;
      const ontarioPeriod = ontarioTax / periods;
      const deductionsPeriod = totalDeductions / periods;
      const netPeriod = annualNetPay / periods;
      const effectiveTaxRate = totalDeductions / salary * 100;
      const marginalFederal = getMarginalRate(federalTaxable, federalBrackets);
      const marginalOntario = getMarginalRate(ontarioTaxable, ontarioBrackets);
      const combinedMarginal = marginalFederal + marginalOntario;
      return [
        { label: "Gross Pay Per Period", key: "grossPeriod", value: Math.round(grossPeriod * 100) / 100, unit: "$", color: "blue" },
        { label: "CPP Deduction", key: "cppDeduction", value: Math.round(cppPeriod * 100) / 100, unit: "$", color: "amber" },
        { label: "EI Deduction", key: "eiDeduction", value: Math.round(eiPeriod * 100) / 100, unit: "$", color: "amber" },
        { label: "Federal Tax", key: "federalTax", value: Math.round(federalPeriod * 100) / 100, unit: "$", color: "red" },
        { label: "Ontario Provincial Tax", key: "ontarioTax", value: Math.round(ontarioPeriod * 100) / 100, unit: "$", color: "red" },
        { label: "Total Deductions Per Period", key: "totalDeductions", value: Math.round(deductionsPeriod * 100) / 100, unit: "$", color: "red" },
        { label: "Net Pay Per Period", key: "netPeriod", value: Math.round(netPeriod * 100) / 100, unit: "$", color: "green" },
        { label: "Annual Net Pay", key: "annualNetPay", value: Math.round(annualNetPay * 100) / 100, unit: "$", color: "green" },
        { label: "Effective Tax Rate", key: "effectiveTaxRate", value: Math.round(effectiveTaxRate * 100) / 100, unit: "%", color: "default" },
        { label: "Marginal Tax Rate", key: "marginalRate", value: Math.round(combinedMarginal * 10000) / 100, unit: "%", color: "blue" },
      ];
    },
    chart: (results) => {
      const gross = results.find(r => r.key === "grossPeriod")?.value as number || 0;
      const net = results.find(r => r.key === "netPeriod")?.value as number || 0;
      const cpp = results.find(r => r.key === "cppDeduction")?.value as number || 0;
      const ei = results.find(r => r.key === "eiDeduction")?.value as number || 0;
      const fed = results.find(r => r.key === "federalTax")?.value as number || 0;
      const ont = results.find(r => r.key === "ontarioTax")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Gross Pay", "CPP", "EI", "Federal Tax", "Ontario Tax", "Net Pay"],
          datasets: [{
            label: "Amount Per Period",
            data: [gross, cpp, ei, fed, ont, net],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)", "rgba(239, 68, 68, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { annualSalary: 75000, payFrequency: "semi-monthly" }, results: [] },
    faqs: [
      { question: "How is Ontario take-home pay calculated?", answer: "Your take-home pay is calculated by subtracting CPP contributions, EI premiums, federal income tax, and Ontario provincial tax from your gross salary. Each deduction uses 2025 tax brackets and rates." },
      { question: "What are the CPP rates and limits for 2025?", answer: "The 2025 CPP rate is 5.95% on earnings between $3,500 and $71,300. The maximum annual CPP contribution is $4,034.10. The Year's Basic Exemption is $3,500." },
      { question: "What are the EI rates and limits for 2025?", answer: "The 2025 EI premium rate is 1.64% on maximum insurable earnings of $56,300. The maximum annual EI premium is $923.32." },
      { question: "What is the Ontario basic personal amount for 2025?", answer: "The federal basic personal amount is $15,705 for 2025. The Ontario basic personal amount is $12,843. These are the amounts you can earn before paying any income tax." },
      { question: "What are the Ontario tax brackets for 2025?", answer: "Ontario 2025 brackets: 5.05% up to $51,446, 9.15% $51,447-$102,894, 11.16% $102,895-$150,000, 12.16% $150,001-$220,000, and 13.16% over $220,000." },
      { question: "What is the difference between marginal and effective tax rate?", answer: "Your marginal tax rate is the rate on your next dollar of income. Your effective (average) tax rate is total tax divided by total income. The effective rate is always lower than the marginal rate." },
      { question: "Does this calculator include Ontario Health Premium?", answer: "No, the Ontario Health Premium was eliminated in 2019. Current Ontario income tax is calculated solely on the provincial tax brackets shown." },
      { question: "How does overtime affect my take-home pay?", answer: "Overtime is taxed at your marginal tax rate. Some of your overtime earnings may fall into a higher tax bracket, but only the portion above the bracket threshold is taxed at the higher rate." },
    ],
    relatedSlugs: ["salary-calculator", "tax-calculator", "rrsp-contribution-tax-savings-calculator", "tfsa-contribution-room-calculator-canada", "canada-child-benefit-calculator-by-income"],
  },
  {
    icon: House,
    name: "Canada Mortgage Stress Test Calculator",
    slug: "canada-mortgage-stress-test-calculator",
    category: "real-estate",
    description: "Check if you qualify for a mortgage under Canada's stress test rules with GDS and TDS ratio calculations.",
    metaTitle: "Canada Mortgage Stress Test Calculator 2025 | Measurely",
    metaDescription: "Free Canada mortgage stress test calculator. Calculate your GDS and TDS ratios, stress test rate, and see if you qualify under OSFI's B-20 guidelines. Accurate for 2025-2026.",
    inputs: [
      { label: "Property Price ($)", key: "propertyPrice", type: "number", placeholder: "e.g., 600000", min: 1, step: 10000, defaultValue: 600000 },
      { label: "Down Payment (%)", key: "downPaymentPercent", type: "number", placeholder: "e.g., 10", min: 0, max: 100, step: 1, defaultValue: 10 },
      { label: "Annual Household Income ($)", key: "annualIncome", type: "number", placeholder: "e.g., 100000", min: 1, step: 5000, defaultValue: 100000 },
      { label: "Monthly Debt Payments ($)", key: "monthlyDebts", type: "number", placeholder: "e.g., 500", min: 0, step: 50, defaultValue: 500 },
      { label: "Annual Property Tax Rate (%)", key: "propertyTaxRate", type: "number", placeholder: "e.g., 1.0", min: 0, max: 5, step: 0.1, defaultValue: 1.0 },
      { label: "Monthly Heating Costs ($)", key: "heatingCosts", type: "number", placeholder: "e.g., 150", min: 0, step: 25, defaultValue: 150 },
      { label: "Mortgage Interest Rate (%)", key: "mortgageRate", type: "number", placeholder: "e.g., 5.0", min: 0, max: 20, step: 0.1, defaultValue: 5.0 },
      { label: "Amortization Period (Years)", key: "amortizationYears", type: "number", placeholder: "e.g., 25", min: 5, max: 30, defaultValue: 25 },
    ],
    compute: (inputs) => {
      const propertyPrice = Number(inputs.propertyPrice);
      const downPaymentPct = Number(inputs.downPaymentPercent) / 100;
      const annualIncome = Number(inputs.annualIncome);
      const monthlyDebts = Number(inputs.monthlyDebts);
      const taxRate = Number(inputs.propertyTaxRate) / 100;
      const heating = Number(inputs.heatingCosts);
      const rate = Number(inputs.mortgageRate) / 100;
      const amortYears = Number(inputs.amortizationYears);
      let minDownPct: number;
      if (propertyPrice >= 1000000) minDownPct = 0.20;
      else if (propertyPrice > 500000) minDownPct = (500000 * 0.05 + (propertyPrice - 500000) * 0.10) / propertyPrice;
      else minDownPct = 0.05;
      const actualDownPct = Math.max(downPaymentPct, minDownPct);
      const downPayment = propertyPrice * actualDownPct;
      let mortgage = propertyPrice - downPayment;
      let cmhcRate = 0;
      if (actualDownPct < 0.20) {
        if (actualDownPct < 0.10) cmhcRate = 0.04;
        else if (actualDownPct < 0.15) cmhcRate = 0.031;
        else cmhcRate = 0.028;
        mortgage += mortgage * cmhcRate;
      }
      const stressTestRate = Math.max(rate + 0.02, 0.0525);
      const numPayments = amortYears * 12;
      const monthlyContractRate = rate / 12;
      const monthlyPaymentContract = mortgage * monthlyContractRate * Math.pow(1 + monthlyContractRate, numPayments) / (Math.pow(1 + monthlyContractRate, numPayments) - 1);
      const monthlyStressRate = stressTestRate / 12;
      const monthlyPaymentStress = mortgage * monthlyStressRate * Math.pow(1 + monthlyStressRate, numPayments) / (Math.pow(1 + monthlyStressRate, numPayments) - 1);
      const monthlyPropertyTax = propertyPrice * taxRate / 12;
      const grossMonthlyIncome = annualIncome / 12;
      const gds = (monthlyPaymentStress + monthlyPropertyTax + heating) / grossMonthlyIncome;
      const tds = (monthlyPaymentStress + monthlyPropertyTax + heating + monthlyDebts) / grossMonthlyIncome;
      const gdsLimit = 0.39;
      const tdsLimit = 0.44;
      const gdsPassed = gds <= gdsLimit;
      const tdsPassed = tds <= tdsLimit;
      const qualified = gdsPassed && tdsPassed;
      const maxGdsPayment = grossMonthlyIncome * gdsLimit - monthlyPropertyTax - heating;
      const maxTdsPayment = grossMonthlyIncome * tdsLimit - monthlyPropertyTax - heating - monthlyDebts;
      const maxAllowedPayment = Math.min(maxGdsPayment, maxTdsPayment);
      const maxAffordableMortgage = maxAllowedPayment > 0
        ? maxAllowedPayment * (Math.pow(1 + monthlyStressRate, numPayments) - 1) / (monthlyStressRate * Math.pow(1 + monthlyStressRate, numPayments))
        : 0;
      return [
        { label: "Mortgage Amount", key: "mortgageAmount", value: Math.round(mortgage * 100) / 100, unit: "$", color: "blue" },
        { label: "Down Payment", key: "downPayment", value: Math.round(downPayment * 100) / 100, unit: "$", color: "blue" },
        { label: "Stress Test Rate", key: "stressTestRate", value: Math.round(stressTestRate * 10000) / 100, unit: "%", color: "amber" },
        { label: "Monthly Payment (Stress Test)", key: "monthlyPaymentStress", value: Math.round(monthlyPaymentStress * 100) / 100, unit: "$", color: "red" },
        { label: "Monthly Payment (Actual Rate)", key: "monthlyPaymentContract", value: Math.round(monthlyPaymentContract * 100) / 100, unit: "$", color: "green" },
        { label: "GDS Ratio", key: "gds", value: Math.round(gds * 10000) / 100, unit: "%", color: gdsPassed ? "green" : "red" },
        { label: "TDS Ratio", key: "tds", value: Math.round(tds * 10000) / 100, unit: "%", color: tdsPassed ? "green" : "red" },
        { label: "GDS Limit (39%)", key: "gdsLimit", value: 39, unit: "%", color: "default" },
        { label: "TDS Limit (44%)", key: "tdsLimit", value: 44, unit: "%", color: "default" },
        { label: "GDS Passed", key: "gdsPassed", value: gdsPassed ? "Yes" : "No", color: gdsPassed ? "green" : "red" },
        { label: "TDS Passed", key: "tdsPassed", value: tdsPassed ? "Yes" : "No", color: tdsPassed ? "green" : "red" },
        { label: "Overall Qualification", key: "qualified", value: qualified ? "Qualified" : "Not Qualified", color: qualified ? "green" : "red" },
      ];
    },
    chart: (results) => {
      const gds = results.find(r => r.key === "gds")?.value as number || 0;
      const tds = results.find(r => r.key === "tds")?.value as number || 0;
      const gdsLimit = 39;
      const tdsLimit = 44;
      return {
        type: "bar",
        data: {
          labels: ["GDS Ratio", "TDS Ratio"],
          datasets: [
            {
              label: "Your Ratio (%)",
              data: [gds, tds],
              backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(239, 68, 68, 0.8)"],
              borderColor: ["rgba(239, 68, 68, 1)", "rgba(239, 68, 68, 1)"],
              borderWidth: 2,
              borderRadius: 8,
            },
            {
              label: "Maximum Allowable (%)",
              data: [gdsLimit, tdsLimit],
              backgroundColor: ["rgba(34, 197, 94, 0.4)", "rgba(34, 197, 94, 0.4)"],
              borderColor: ["rgba(34, 197, 94, 1)", "rgba(34, 197, 94, 1)"],
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { propertyPrice: 600000, downPaymentPercent: 10, annualIncome: 100000, monthlyDebts: 500, propertyTaxRate: 1.0, heatingCosts: 150, mortgageRate: 5.0, amortizationYears: 25 }, results: [] },
    faqs: [
      { question: "What is the mortgage stress test in Canada?", answer: "The mortgage stress test requires borrowers to qualify at the greater of the Bank of Canada's 5-year benchmark rate (currently 5.25%) or their contract rate plus 2%. It ensures you can still afford payments if rates rise." },
      { question: "What are GDS and TDS ratios?", answer: "GDS (Gross Debt Service) ratio is housing costs (mortgage payment + property tax + heating) divided by gross income. TDS (Total Debt Service) ratio includes all debt payments. Maximums are 39% and 44% respectively under B-20 guidelines." },
      { question: "What is the minimum down payment in Canada?", answer: "For homes under $500,000, minimum down payment is 5%. For homes $500,000-$999,999, it's 5% on the first $500K and 10% over $500K. For homes $1M+, minimum down payment is 20%." },
      { question: "What is CMHC insurance and when is it required?", answer: "CMHC insurance protects lenders against default and is required when the down payment is less than 20%. Premiums range from 2.8% to 4.0% of the mortgage amount and are added to the mortgage." },
      { question: "What is the current stress test qualifying rate?", answer: "The minimum qualifying rate for the stress test is 5.25% (the Bank of Canada floor) or your contract rate plus 2%, whichever is higher. As of 2025-2026, most borrowers qualify at contract rate + 2%." },
      { question: "How does the stress test affect how much I can borrow?", answer: "The stress test reduces your borrowing power by roughly 20-25% compared to qualifying at the contract rate. You may qualify for a smaller mortgage than the monthly payment on your desired home suggests." },
      { question: "Are first-time home buyers exempt from the stress test?", answer: "No, the stress test applies to all federally regulated lenders. However, first-time buyers can use the Home Buyers' Plan (withdraw up to $60,000 from RRSP) and may qualify for first-time home buyer incentives." },
      { question: "Does the stress test apply to mortgage renewals?", answer: "As of 2025, the stress test does not apply to straight renewals with the same lender where there is no increase in the mortgage amount. It applies to new mortgages and switches to new lenders." },
    ],
    relatedSlugs: ["home-affordability-calculator", "mortgage-calculator", "rent-vs-buy-calculator", "loan-calculator", "home-equity-loan-calculator"],
  },
  {
    icon: Baby,
    name: "Canada Child Benefit Calculator by Income",
    slug: "canada-child-benefit-calculator-by-income",
    category: "finance",
    description: "Estimate your Canada Child Benefit (CCB) and Ontario Child Benefit (OCB) payments based on income and number of children.",
    metaTitle: "Canada Child Benefit Calculator by Income 2025-2026 | Measurely",
    metaDescription: "Free Canada Child Benefit calculator for 2025-2026. Estimate your CCB and OCB payments based on adjusted family net income, number of children, and province. Accurate CRA benefit calculations.",
    inputs: [
      { label: "Number of Children Under 6", key: "childrenUnder6", type: "number", placeholder: "e.g., 1", min: 0, max: 20, step: 1, defaultValue: 1 },
      { label: "Number of Children Ages 6-17", key: "children6to17", type: "number", placeholder: "e.g., 1", min: 0, max: 20, step: 1, defaultValue: 1 },
      { label: "Adjusted Family Net Income ($)", key: "adjustedFamilyNetIncome", type: "number", placeholder: "e.g., 80000", min: 0, step: 1000, defaultValue: 80000 },
      { label: "Province", key: "province", type: "select", options: [{ label: "Ontario", value: "ontario" }, { label: "British Columbia", value: "bc" }, { label: "Alberta", value: "ab" }, { label: "Quebec", value: "qc" }, { label: "Manitoba", value: "mb" }, { label: "Saskatchewan", value: "sk" }, { label: "Nova Scotia", value: "ns" }, { label: "New Brunswick", value: "nb" }, { label: "Newfoundland and Labrador", value: "nl" }, { label: "Prince Edward Island", value: "pe" }, { label: "Northwest Territories", value: "nt" }, { label: "Nunavut", value: "nu" }, { label: "Yukon", value: "yt" }], defaultValue: "ontario" },
      { label: "Marital Status", key: "maritalStatus", type: "select", options: [{ label: "Married / Common-Law", value: "married" }, { label: "Single / Divorced / Separated", value: "single" }, { label: "Widowed", value: "widowed" }], defaultValue: "married" },
    ],
    compute: (inputs) => {
      const under6 = Number(inputs.childrenUnder6);
      const age6to17 = Number(inputs.children6to17);
      const income = Number(inputs.adjustedFamilyNetIncome);
      const province = String(inputs.province);
      const totalChildren = under6 + age6to17;
      const maxUnder6 = 7787;
      const max6to17 = 6570;
      const incomeThreshold = 36502;
      const baseCCB = under6 * maxUnder6 + age6to17 * max6to17;
      let reductionRate: number;
      if (totalChildren <= 0) reductionRate = 0;
      else if (totalChildren === 1) reductionRate = 0.07;
      else if (totalChildren === 2) reductionRate = 0.135;
      else if (totalChildren === 3) reductionRate = 0.19;
      else reductionRate = 0.23;
      const reduction = income > incomeThreshold ? (income - incomeThreshold) * reductionRate : 0;
      const netCCB = Math.max(0, baseCCB - reduction);
      const ocbPerChild = 1683;
      const ocb = province === "ontario" ? totalChildren * ocbPerChild : 0;
      const totalBenefits = netCCB + ocb;
      const monthlyPayment = totalBenefits / 12;
      const ccbPerChildUnder6 = under6 > 0 && baseCCB > 0 ? netCCB * (under6 * maxUnder6 / baseCCB) / under6 : 0;
      const ccbPerChild6to17 = age6to17 > 0 && baseCCB > 0 ? netCCB * (age6to17 * max6to17 / baseCCB) / age6to17 : 0;
      return [
        { label: "CCB Per Child (Under 6)", key: "ccbPerChildUnder6", value: Math.round(ccbPerChildUnder6 * 100) / 100, unit: "$/yr", color: "green" },
        { label: "CCB Per Child (Ages 6-17)", key: "ccbPerChild6to17", value: Math.round(ccbPerChild6to17 * 100) / 100, unit: "$/yr", color: "green" },
        { label: "Total CCB", key: "totalCCB", value: Math.round(netCCB * 100) / 100, unit: "$/yr", color: "green" },
        { label: "Ontario Child Benefit (OCB)", key: "ocb", value: Math.round(ocb * 100) / 100, unit: "$/yr", color: "blue" },
        { label: "Total Annual Benefits", key: "totalBenefits", value: Math.round(totalBenefits * 100) / 100, unit: "$/yr", color: "green" },
        { label: "Monthly Payment Amount", key: "monthlyPayment", value: Math.round(monthlyPayment * 100) / 100, unit: "$/mo", color: "green" },
      ];
    },
    chart: (results) => {
      const ccb = results.find(r => r.key === "totalCCB")?.value as number || 0;
      const ocb = results.find(r => r.key === "ocb")?.value as number || 0;
      const monthly = results.find(r => r.key === "monthlyPayment")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Total CCB", "Ontario Child Benefit", "Monthly Payment"],
          datasets: [{
            label: "Benefit Amount",
            data: [ccb, ocb, monthly * 12],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { childrenUnder6: 1, children6to17: 1, adjustedFamilyNetIncome: 80000, province: "ontario", maritalStatus: "married" }, results: [] },
    faqs: [
      { question: "How is the Canada Child Benefit calculated?", answer: "CCB is calculated based on the number of children, their ages, and your adjusted family net income. For 2025-2026, maximum benefits are $7,787 per child under 6 and $6,570 per child aged 6-17. Benefits are reduced when income exceeds $36,502." },
      { question: "What is the Ontario Child Benefit (OCB)?", answer: "The Ontario Child Benefit provides up to $1,683 per child per year (2025-2026) to low- and middle-income families in Ontario. It is paid together with the CCB as a single monthly payment." },
      { question: "What income counts as adjusted family net income?", answer: "Adjusted family net income is line 23600 of your tax return plus any universal child care benefit (UCCB) and registered disability savings plan (RDSP) income, minus any RDSP contributions and child care expenses." },
      { question: "How does the number of children affect the CCB reduction rate?", answer: "The reduction rate increases with more children: 7% for 1 child, 13.5% for 2 children, 19% for 3 children, and 23% for 4 or more children." },
      { question: "When is the CCB paid?", answer: "CCB payments are made monthly (typically on the 20th) from July to June, based on the previous year's tax return. Your benefit year runs from July 1 to June 30." },
      { question: "Do I need to apply for the Canada Child Benefit?", answer: "Yes, you must apply. You can register your child's birth through your province and consent to share information with the CRA, or apply directly through your CRA My Account." },
      { question: "Can separated parents both receive CCB?", answer: "No, CCB is paid to the parent who primarily resides with the child. In shared custody situations (at least 40% of the time with each parent), each parent receives 50% of the calculated benefit." },
      { question: "What is the CCB reduction threshold for 2025-2026?", answer: "The CCB income threshold is $36,502 for the 2025-2026 benefit year. Income below this amount results in the maximum CCB payment." },
    ],
    relatedSlugs: ["tfsa-contribution-room-calculator-canada", "rrsp-contribution-tax-savings-calculator", "ontario-take-home-pay-calculator-after-tax", "salary-calculator", "tax-calculator"],
  },
  {
    icon: HandCoins,
    name: "Ontario Severance Pay Calculator",
    slug: "ontario-severance-pay-calculator",
    category: "business",
    description: "Calculate Ontario statutory severance, ESA notice pay, and estimate common law termination entitlements.",
    metaTitle: "Ontario Severance Pay Calculator | ESA Notice & Severance Pay",
    metaDescription: "Free Ontario severance pay calculator. Calculate ESA minimum notice pay, statutory severance pay for 5+ year employees, and estimated common law termination entitlements.",
    inputs: [
      { label: "Annual Salary ($)", key: "annualSalary", type: "number", placeholder: "e.g., 75000", min: 1, step: 1000, defaultValue: 75000 },
      { label: "Years of Service", key: "yearsOfService", type: "number", placeholder: "e.g., 5", min: 0.25, max: 50, step: 0.5, defaultValue: 5 },
      { label: "Reason for Termination", key: "terminationReason", type: "select", options: [{ label: "Without Cause (Individual)", value: "without-cause" }, { label: "Without Cause (Mass Layoff)", value: "mass-layoff" }, { label: "With Cause", value: "for-cause" }, { label: "Constructive Dismissal", value: "constructive-dismissal" }], defaultValue: "without-cause" },
      { label: "Employer Annual Ontario Payroll ($)", key: "employerPayroll", type: "number", placeholder: "e.g., 2500000", min: 0, step: 100000, defaultValue: 2500000 },
    ],
    compute: (inputs) => {
      const annualSalary = Number(inputs.annualSalary);
      const years = Number(inputs.yearsOfService);
      const reason = String(inputs.terminationReason);
      const payroll = Number(inputs.employerPayroll);
      const weeklyPay = annualSalary / 52;
      let noticeWeeks = 0;
      if (years < 1) noticeWeeks = 1;
      else if (years < 3) noticeWeeks = 2;
      else if (years < 4) noticeWeeks = 3;
      else if (years < 5) noticeWeeks = 4;
      else if (years < 6) noticeWeeks = 5;
      else if (years < 7) noticeWeeks = 6;
      else if (years < 8) noticeWeeks = 7;
      else noticeWeeks = 8;
      const statutoryNoticePay = Math.round(noticeWeeks * weeklyPay * 100) / 100;
      const severanceEligible = years >= 5 && payroll >= 2500000;
      const severanceWeeks = severanceEligible ? Math.min(Math.floor(years), 26) : 0;
      const statutorySeverancePay = Math.round(severanceWeeks * weeklyPay * 100) / 100;
      const totalStatutory = Math.round((statutoryNoticePay + statutorySeverancePay) * 100) / 100;
      let commonLawLow = 0, commonLawHigh = 0;
      if (reason !== "for-cause") {
        const lowWeeks = Math.min(years * 3, 104);
        const highWeeks = Math.min(years * 5, 104);
        if (reason === "constructive-dismissal") {
          commonLawLow = Math.round(lowWeeks * weeklyPay * 1.1 * 100) / 100;
          commonLawHigh = Math.round(highWeeks * weeklyPay * 1.2 * 100) / 100;
        } else {
          commonLawLow = Math.round(lowWeeks * weeklyPay * 100) / 100;
          commonLawHigh = Math.round(highWeeks * weeklyPay * 100) / 100;
        }
      }
      const totalEstimated = Math.round(((commonLawLow + commonLawHigh) / 2 + totalStatutory) * 100) / 100;
      return [
        { label: "Weekly Pay", key: "weeklyPay", value: Math.round(weeklyPay * 100) / 100, unit: "$/wk", color: "default" },
        { label: "ESA Notice Period", key: "noticeWeeks", value: noticeWeeks, unit: "weeks", color: "default" },
        { label: "ESA Notice Pay", key: "statutoryNoticePay", value: statutoryNoticePay, unit: "$", color: "blue" },
        { label: "ESA Severance Pay", key: "statutorySeverancePay", value: statutorySeverancePay, unit: "$", color: severanceEligible ? "blue" : "default" },
        { label: "Total ESA Minimum", key: "totalStatutory", value: totalStatutory, unit: "$", color: "green" },
        { label: "Common Law (Low Est.)", key: "commonLawLow", value: commonLawLow, unit: "$", color: "amber" },
        { label: "Common Law (High Est.)", key: "commonLawHigh", value: commonLawHigh, unit: "$", color: "amber" },
        { label: "Total Estimated Payout", key: "totalEstimated", value: totalEstimated, unit: "$", color: "green" },
      ];
    },
    chart: (results) => {
      const esa = results.find(r => r.key === "totalStatutory")?.value as number || 0;
      const low = results.find(r => r.key === "commonLawLow")?.value as number || 0;
      const high = results.find(r => r.key === "commonLawHigh")?.value as number || 0;
      if (low === 0 && high === 0) return null;
      return {
        type: "bar",
        data: {
          labels: ["ESA Minimum", "Common Law (Low)", "Common Law (High)"],
          datasets: [{
            label: "Payout ($)",
            data: [esa, low, high],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { annualSalary: 75000, yearsOfService: 5, terminationReason: "without-cause", employerPayroll: 2500000 }, results: [] },
    faqs: [
      { question: "What is the difference between ESA notice and severance pay?", answer: "ESA notice pay compensates for the statutory notice period required by Ontario law. Severance pay is an additional payment for employees with 5+ years at companies with $2.5M+ Ontario payroll." },
      { question: "How is common law severance different from ESA minimums?", answer: "Common law severance is based on court precedents and is typically much higher than ESA minimums. It considers age, position, length of service, and availability of similar employment." },
      { question: "When is an employee entitled to ESA severance pay?", answer: "Employees with 5+ years of continuous service are entitled if the employer's Ontario payroll is $2.5M+ or the termination is part of a mass layoff of 50+ employees." },
      { question: "What happens if I am terminated for cause?", answer: "Just cause means the employer does not owe ESA notice or common law notice. However, courts set a high bar for just cause involving serious misconduct or repeated insubordination." },
      { question: "Can non-unionized employees sue for more than ESA minimums?", answer: "Yes, non-unionized employees can pursue common law reasonable notice, often 3-5 weeks per year of service depending on age, position, and labour market conditions." },
      { question: "Is severance pay taxable in Canada?", answer: "Yes, severance and termination pay are taxable as income. Employers must deduct income tax, CPP, and EI at source from these payments." },
      { question: "How does mass layoff affect my entitlements?", answer: "In a mass layoff (50+ employees), ESA notice periods increase and additional rules apply. EI benefits may be available immediately." },
      { question: "What is constructive dismissal?", answer: "Constructive dismissal occurs when an employer makes a unilateral fundamental change to compensation, duties, or work location without consent. The employee can treat this as termination and claim severance." },
    ],
    relatedSlugs: ["salary-calculator", "tax-calculator", "paycheck-calculator", "freelance-rate-calculator", "roi-calculator"],
  },
  {
    icon: Receipt,
    name: "GST/HST Calculator Ontario",
    slug: "gst-hst-calculator-ontario",
    category: "finance",
    description: "Calculate Ontario HST (13%) — add or remove HST and see the GST and PST breakdown.",
    metaTitle: "GST/HST Calculator Ontario | 13% HST Calculator",
    metaDescription: "Free Ontario HST calculator. Add or remove 13% HST (5% GST + 8% PST) from any amount. See the full tax breakdown with pre-tax amount, GST, PST, and total.",
    inputs: [
      { label: "Amount ($)", key: "amount", type: "number", placeholder: "e.g., 1000", min: 0.01, step: 10, defaultValue: 1000 },
      { label: "Calculation Type", key: "calcType", type: "radio", options: [{ label: "Amount Before HST (Add HST)", value: "add-hst" }, { label: "Amount Includes HST (Remove HST)", value: "remove-hst" }], defaultValue: "add-hst" },
    ],
    compute: (inputs) => {
      const amount = Number(inputs.amount);
      const calcType = String(inputs.calcType);
      const hstRate = 0.13;
      const gstRate = 0.05;
      const pstRate = 0.08;
      let preTax = 0, hst = 0, total = 0, gst = 0, pst = 0;
      if (calcType === "add-hst") {
        preTax = amount;
        gst = Math.round(amount * gstRate * 100) / 100;
        pst = Math.round(amount * pstRate * 100) / 100;
        hst = Math.round(amount * hstRate * 100) / 100;
        total = Math.round(amount * (1 + hstRate) * 100) / 100;
      } else {
        total = amount;
        preTax = Math.round(amount / (1 + hstRate) * 100) / 100;
        hst = Math.round((amount - preTax) * 100) / 100;
        gst = Math.round(preTax * gstRate * 100) / 100;
        pst = Math.round(preTax * pstRate * 100) / 100;
      }
      return [
        { label: "Pre-Tax Amount", key: "preTax", value: preTax, unit: "$", color: "blue" },
        { label: "GST (5%)", key: "gst", value: gst, unit: "$", color: "amber" },
        { label: "PST / Ontario Portion (8%)", key: "pst", value: pst, unit: "$", color: "amber" },
        { label: "Total HST (13%)", key: "totalHst", value: hst, unit: "$", color: "red" },
        { label: "Total with Tax", key: "total", value: total, unit: "$", color: "green" },
      ];
    },
    chart: (results) => {
      const preTax = results.find(r => r.key === "preTax")?.value as number || 0;
      const gst = results.find(r => r.key === "gst")?.value as number || 0;
      const pst = results.find(r => r.key === "pst")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Pre-Tax Amount", "GST (5%)", "PST / Ontario Portion (8%)"],
          datasets: [{
            data: [preTax, gst, pst],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { amount: 1000, calcType: "add-hst" }, results: [] },
    faqs: [
      { question: "What is the Ontario HST rate?", answer: "Ontario's HST rate is 13%, consisting of 5% federal GST and 8% provincial PST. This is a single blended tax administered by the Canada Revenue Agency." },
      { question: "How do you calculate HST from a pre-tax amount?", answer: "Multiply the pre-tax amount by 13% (0.13). For example, $100 × 0.13 = $13 HST, making the total $113." },
      { question: "How do you remove HST from a total?", answer: "Divide the total by 1.13 to get the pre-tax amount. For example, $113 ÷ 1.13 = $100 pre-tax, and $113 - $100 = $13 HST." },
      { question: "What is the difference between GST and PST?", answer: "GST is the federal Goods and Services Tax (5%). PST is the provincial portion (8% in Ontario). Together they form the 13% HST, collected as one combined tax." },
      { question: "What items are exempt from HST in Ontario?", answer: "Basic groceries, child care, prescription drugs, medical devices, educational services, and residential rent are generally exempt from HST." },
      { question: "Do businesses charge HST on everything?", answer: "Most goods and services are subject to HST, but some are zero-rated (taxable at 0%) like basic groceries, or exempt like health and educational services." },
      { question: "Can businesses claim Input Tax Credits for HST?", answer: "Yes, registered businesses can claim ITCs to recover HST paid on business expenses. This means the business effectively pays HST only on the value they add." },
      { question: "Is the HST rate the same across all Canadian provinces?", answer: "No. Some provinces use HST (Ontario 13%, Quebec 14.975%, etc.), others use separate GST + PST, and Alberta has only 5% GST with no provincial sales tax." },
    ],
    relatedSlugs: ["tax-calculator", "salary-calculator", "percentage-calculator", "discount-calculator"],
  },
  {
    icon: DollarSign,
    name: "1099 Tax Calculator for Freelancers",
    slug: "1099-tax-calculator-for-freelancers",
    category: "business",
    description: "Estimate your quarterly and annual self-employment tax, federal income tax, and balance due as a 1099 freelancer.",
    metaTitle: "1099 Tax Calculator for Freelancers | Self-Employment Tax 2025",
    metaDescription: "Free 1099 tax calculator for freelancers. Estimate self-employment tax (15.3%), federal income tax, deductions, and quarterly payments for 2025 tax year.",
    inputs: [
      { label: "Total 1099 Income ($)", key: "totalIncome", type: "number", placeholder: "e.g., 80000", min: 1, step: 1000, defaultValue: 80000 },
      { label: "Business Expenses ($)", key: "businessExpenses", type: "number", placeholder: "e.g., 12000", min: 0, step: 500, defaultValue: 12000 },
      { label: "Filing Status", key: "filingStatus", type: "select", options: [{ label: "Single", value: "single" }, { label: "Married Filing Jointly", value: "married" }, { label: "Head of Household", value: "head-of-household" }], defaultValue: "single" },
      { label: "Other Income ($)", key: "otherIncome", type: "number", placeholder: "e.g., 5000", min: 0, step: 500, defaultValue: 5000 },
      { label: "Estimated Tax Payments Already Made ($)", key: "paymentsMade", type: "number", placeholder: "e.g., 8000", min: 0, step: 500, defaultValue: 8000 },
      { label: "State", key: "state", type: "select", options: [{ label: "No State Income Tax", value: "none" }, { label: "California", value: "california" }, { label: "New York", value: "new-york" }, { label: "Texas", value: "texas" }, { label: "Florida", value: "florida" }, { label: "Illinois", value: "illinois" }, { label: "Pennsylvania", value: "pennsylvania" }, { label: "Ohio", value: "ohio" }, { label: "Other", value: "other" }], defaultValue: "none" },
    ],
    compute: (inputs) => {
      const totalIncome = Number(inputs.totalIncome);
      const expenses = Number(inputs.businessExpenses);
      const filingStatus = String(inputs.filingStatus);
      const otherIncome = Number(inputs.otherIncome);
      const paymentsMade = Number(inputs.paymentsMade);
      const state = String(inputs.state);
      const netProfit = Math.max(0, totalIncome - expenses);
      const seTaxableEarnings = netProfit * 0.9235;
      const socialSecurityTax = Math.min(seTaxableEarnings, 176100) * 0.124;
      const medicareTax = seTaxableEarnings * 0.029;
      const seTax = Math.round((socialSecurityTax + medicareTax) * 100) / 100;
      const seDeduction = Math.round(seTax * 0.5 * 100) / 100;
      const agi = Math.round((netProfit + otherIncome - seDeduction) * 100) / 100;
      const stdDeductions: Record<string, number> = { single: 15000, married: 30000, "head-of-household": 22500 };
      const standardDeduction = stdDeductions[filingStatus] ?? 15000;
      const taxableIncome = Math.max(0, Math.round((agi - standardDeduction) * 100) / 100);
      const brackets: Record<string, { limit: number; rate: number }[]> = {
        single: [{ limit: 11925, rate: 0.10 }, { limit: 48475, rate: 0.12 }, { limit: 103350, rate: 0.22 }, { limit: 197300, rate: 0.24 }, { limit: 250525, rate: 0.32 }, { limit: 626350, rate: 0.35 }],
        married: [{ limit: 23850, rate: 0.10 }, { limit: 96950, rate: 0.12 }, { limit: 206700, rate: 0.22 }, { limit: 394600, rate: 0.24 }, { limit: 501050, rate: 0.32 }, { limit: 751600, rate: 0.35 }],
        "head-of-household": [{ limit: 17000, rate: 0.10 }, { limit: 70950, rate: 0.12 }, { limit: 107500, rate: 0.22 }, { limit: 197300, rate: 0.24 }, { limit: 250525, rate: 0.32 }, { limit: 626350, rate: 0.35 }],
      };
      const bracketSet = brackets[filingStatus] || brackets.single;
      let incomeTax = 0;
      let remaining = taxableIncome;
      let prevLimit = 0;
      for (const b of bracketSet) {
        const taxable = Math.min(Math.max(remaining - prevLimit, 0), b.limit - prevLimit);
        incomeTax += taxable * b.rate;
        prevLimit = b.limit;
        if (remaining <= b.limit) break;
      }
      if (remaining > prevLimit) incomeTax += (remaining - prevLimit) * 0.37;
      incomeTax = Math.round(incomeTax * 100) / 100;
      const stateRates: Record<string, number> = { none: 0, california: 0.093, "new-york": 0.0685, texas: 0, florida: 0, illinois: 0.0495, pennsylvania: 0.0307, ohio: 0.0399, other: 0.05 };
      const stateTax = Math.round(netProfit * (stateRates[state] ?? 0) * 100) / 100;
      const totalTax = Math.round((incomeTax + seTax + stateTax) * 100) / 100;
      const balanceDue = Math.round((totalTax - paymentsMade) * 100) / 100;
      const effectiveRate = totalIncome > 0 ? Math.round(totalTax / totalIncome * 10000) / 100 : 0;
      return [
        { label: "Gross 1099 Income", key: "grossIncome", value: totalIncome, unit: "$", color: "default" },
        { label: "Business Expenses", key: "businessExpenses", value: expenses, unit: "$", color: "red" },
        { label: "Net Profit", key: "netProfit", value: netProfit, unit: "$", color: "green" },
        { label: "Self-Employment Tax (15.3%)", key: "seTax", value: seTax, unit: "$", color: "red" },
        { label: "SE Tax Deduction (50%)", key: "seDeduction", value: seDeduction, unit: "$", color: "green" },
        { label: "Adjusted Gross Income", key: "agi", value: agi, unit: "$", color: "default" },
        { label: "Standard Deduction", key: "standardDeduction", value: standardDeduction, unit: "$", color: "default" },
        { label: "Taxable Income", key: "taxableIncome", value: taxableIncome, unit: "$", color: "default" },
        { label: "Federal Income Tax", key: "incomeTax", value: incomeTax, unit: "$", color: "red" },
        { label: "State Tax (Est.)", key: "stateTax", value: stateTax, unit: "$", color: "amber" },
        { label: "Total Tax", key: "totalTax", value: totalTax, unit: "$", color: "red" },
        { label: "Payments Already Made", key: "paymentsMade", value: paymentsMade, unit: "$", color: "green" },
        { label: "Balance Due (Refund if negative)", key: "balanceDue", value: balanceDue, unit: "$", color: balanceDue > 0 ? "red" : "green" },
        { label: "Effective Tax Rate", key: "effectiveRate", value: effectiveRate, unit: "%", color: "default" },
      ];
    },
    chart: (results) => {
      const incomeTax = results.find(r => r.key === "incomeTax")?.value as number || 0;
      const seTax = results.find(r => r.key === "seTax")?.value as number || 0;
      const stateTax = results.find(r => r.key === "stateTax")?.value as number || 0;
      const netProfit = results.find(r => r.key === "netProfit")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Net Profit", "Federal Income Tax", "Self-Employment Tax", "State Tax"],
          datasets: [{
            data: [netProfit, incomeTax, seTax, stateTax],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(99, 102, 241, 0.8)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(245, 158, 11, 1)", "rgba(99, 102, 241, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { totalIncome: 80000, businessExpenses: 12000, filingStatus: "single", otherIncome: 5000, paymentsMade: 8000, state: "none" }, results: [] },
    faqs: [
      { question: "What is self-employment tax?", answer: "Self-employment tax is 15.3% of your net earnings, covering Social Security (12.4%) and Medicare (2.9%). It is the self-employed equivalent of the employer + employee FICA tax." },
      { question: "Can I deduct half of my self-employment tax?", answer: "Yes, you can deduct 50% of your self-employment tax as an adjustment to income on Form 1040, reducing your adjusted gross income (AGI) and federal income tax." },
      { question: "What is the Social Security wage base for 2025?", answer: "For 2025, the Social Security portion (12.4%) applies to the first $176,100 of net earnings. The Medicare portion (2.9%) applies to all net earnings with no cap." },
      { question: "Do I need to make quarterly estimated tax payments?", answer: "Yes, if you expect to owe $1,000+ in federal tax, you should make quarterly payments using Form 1040-ES to avoid underpayment penalties." },
      { question: "What business expenses can freelancers deduct?", answer: "Common deductions include home office, software, equipment, internet, phone, marketing, travel, education, health insurance premiums, and retirement contributions." },
      { question: "How is the standard deduction different for filing statuses?", answer: "For 2025: Single $15,000, Married Filing Jointly $30,000, Head of Household $22,500. This amount is subtracted from AGI to determine taxable income." },
      { question: "What are the 2025 federal income tax brackets?", answer: "For single filers: 10% up to $11,925, 12% up to $48,475, 22% up to $103,350, 24% up to $197,300, 32% up to $250,525, 35% up to $626,350, 37% above that." },
      { question: "How does state tax affect my total tax bill?", answer: "State income tax rates vary from 0% (Texas, Florida) to 13.3% (California top bracket). This calculator applies a flat estimated rate for the selected state." },
    ],
    relatedSlugs: ["tax-calculator", "freelance-rate-calculator", "roi-calculator", "salary-calculator", "paycheck-calculator"],
  },
  {
    icon: Clock,
    name: "Overtime Pay Calculator for Hourly Employees",
    slug: "overtime-pay-calculator-for-hourly-employees",
    category: "business",
    description: "Calculate overtime, double-time, and regular pay based on hours worked and pay period frequency.",
    metaTitle: "Overtime Pay Calculator for Hourly Employees | FLSA Overtime",
    metaDescription: "Free overtime pay calculator. Calculate regular pay, overtime (1.5x), double time (2x), and gross pay for hourly employees. Supports weekly, bi-weekly, semi-monthly, and monthly pay periods.",
    inputs: [
      { label: "Hourly Rate ($)", key: "hourlyRate", type: "number", placeholder: "e.g., 25", min: 0.01, max: 500, step: 0.5, defaultValue: 25 },
      { label: "Regular Hours Worked", key: "regularHours", type: "number", placeholder: "e.g., 40", min: 0, max: 200, step: 1, defaultValue: 40 },
      { label: "Overtime Hours (1.5x)", key: "overtimeHours", type: "number", placeholder: "e.g., 5", min: 0, max: 100, step: 0.5, defaultValue: 5 },
      { label: "Overtime Multiplier", key: "overtimeMultiplier", type: "number", placeholder: "e.g., 1.5", min: 1, max: 3, step: 0.1, defaultValue: 1.5 },
      { label: "Double Time Hours (2x)", key: "doubleTimeHours", type: "number", placeholder: "e.g., 2", min: 0, max: 100, step: 0.5, defaultValue: 2 },
      { label: "Pay Period", key: "payPeriod", type: "select", options: [{ label: "Weekly", value: "weekly" }, { label: "Bi-Weekly", value: "biweekly" }, { label: "Semi-Monthly", value: "semimonthly" }, { label: "Monthly", value: "monthly" }], defaultValue: "weekly" },
    ],
    compute: (inputs) => {
      const hourlyRate = Number(inputs.hourlyRate);
      const regularHours = Number(inputs.regularHours);
      const overtimeHours = Number(inputs.overtimeHours);
      const overtimeMultiplier = Number(inputs.overtimeMultiplier);
      const doubleTimeHours = Number(inputs.doubleTimeHours);
      const payPeriod = String(inputs.payPeriod);
      const periodMultipliers: Record<string, number> = { weekly: 1, biweekly: 2, semimonthly: 2.174, monthly: 4.348 };
      const multiplier = periodMultipliers[payPeriod] ?? 1;
      const regularPay = Math.round(hourlyRate * regularHours * 100) / 100;
      const overtimePay = Math.round(hourlyRate * overtimeMultiplier * overtimeHours * 100) / 100;
      const doubleTimePay = Math.round(hourlyRate * 2 * doubleTimeHours * 100) / 100;
      const grossPay = Math.round((regularPay + overtimePay + doubleTimePay) * 100) / 100;
      const totalHours = regularHours + overtimeHours + doubleTimeHours;
      const effectiveHourlyRate = totalHours > 0 ? Math.round(grossPay / totalHours * 100) / 100 : 0;
      const stdPay = hourlyRate * totalHours;
      const overtimePremium = Math.round((grossPay - stdPay) * 100) / 100;
      const periodName: Record<string, string> = { weekly: "Week", biweekly: "2 Weeks", semimonthly: "Semi-Month", monthly: "Month" };
      const periodLabel = periodName[payPeriod] ?? "Period";
      const periodGross = Math.round(grossPay * multiplier * 100) / 100;
      const annualGross = Math.round(grossPay * 52 * 100) / 100;
      return [
        { label: `Regular Pay (${periodLabel})`, key: "regularPay", value: regularPay, unit: "$", color: "blue" },
        { label: `Overtime Pay (${periodLabel})`, key: "overtimePay", value: overtimePay, unit: "$", color: "amber" },
        { label: `Double Time Pay (${periodLabel})`, key: "doubleTimePay", value: doubleTimePay, unit: "$", color: "red" },
        { label: `Gross Pay (${periodLabel})`, key: "grossPay", value: grossPay, unit: "$", color: "green" },
        { label: `Gross Pay (${periodName[payPeriod] ?? periodLabel})`, key: "periodGross", value: periodGross, unit: "$", color: "green" },
        { label: "Annual Gross Pay", key: "annualGross", value: annualGross, unit: "$", color: "green" },
        { label: "Effective Hourly Rate", key: "effectiveRate", value: effectiveHourlyRate, unit: "$/hr", color: "default" },
        { label: "Overtime Premium Total", key: "overtimePremium", value: overtimePremium, unit: "$", color: "amber" },
      ];
    },
    chart: (results) => {
      const regular = results.find(r => r.key === "regularPay")?.value as number || 0;
      const overtime = results.find(r => r.key === "overtimePay")?.value as number || 0;
      const double = results.find(r => r.key === "doubleTimePay")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Regular Pay", "Overtime Pay", "Double Time Pay"],
          datasets: [{
            data: [regular, overtime, double],
            backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(239, 68, 68, 0.8)"],
            borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(239, 68, 68, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { hourlyRate: 25, regularHours: 40, overtimeHours: 5, overtimeMultiplier: 1.5, doubleTimeHours: 2, payPeriod: "weekly" }, results: [] },
    faqs: [
      { question: "What is FLSA overtime?", answer: "The Fair Labor Standards Act (FLSA) requires overtime at 1.5x the regular rate for all hours worked over 40 in a workweek. Some states also have daily overtime laws." },
      { question: "What is the difference between overtime and double time?", answer: "Overtime is typically 1.5x the regular rate for hours over 40/week. Double time (2x) may apply after 12 hours/day or for 7th consecutive day work in some states like California." },
      { question: "How does pay period frequency affect overtime?", answer: "FLSA overtime is calculated per workweek, not per pay period. For bi-weekly or monthly pay periods, overtime is tracked weekly and accumulated across the period." },
      { question: "Which employees are exempt from overtime?", answer: "Executive, administrative, and professional employees earning above $684/week ($35,568/year) are exempt. Outside sales, computer professionals, and certain others may also be exempt." },
      { question: "Can overtime be mandatory?", answer: "Yes, employers can require overtime as long as they pay the legally required rate. Some states limit mandatory overtime for certain professions like healthcare and transportation." },
      { question: "How is the overtime rate calculated for salaried non-exempt employees?", answer: "Divide the weekly salary by the number of hours it covers to get the regular rate, then multiply by 1.5 for overtime hours." },
      { question: "What states have daily overtime laws?", answer: "California requires overtime after 8 hours/day and double time after 12 hours/day. Alaska, Nevada, and some other states have similar daily overtime rules." },
      { question: "How is overtime calculated when an employee works multiple jobs/rates?", answer: "Use the weighted average of all regular rates. Total weekly pay divided by total hours worked gives the blended regular rate, then apply 1.5x to overtime hours." },
    ],
    relatedSlugs: ["salary-calculator", "paycheck-calculator", "tax-calculator", "freelance-rate-calculator", "roi-calculator"],
  },
  {
    icon: House,
    name: "Debt to Income Ratio Calculator for Mortgage Approval",
    slug: "debt-to-income-ratio-calculator-for-mortgage-approval",
    category: "finance",
    description: "Calculate your front-end and back-end DTI ratios to see which mortgage programs you qualify for.",
    metaTitle: "Debt to Income Ratio Calculator | Mortgage DTI Calculator",
    metaDescription: "Free DTI calculator for mortgage approval. Calculate front-end (housing) and back-end (total) debt-to-income ratios for Conventional, FHA, USDA, and VA loans.",
    inputs: [
      { label: "Gross Monthly Income ($)", key: "grossIncome", type: "number", placeholder: "e.g., 8000", min: 1, step: 500, defaultValue: 8000 },
      { label: "Monthly Housing Payment ($)", key: "housingPayment", type: "number", placeholder: "e.g., 1800", min: 0, step: 100, defaultValue: 1800 },
      { label: "Other Monthly Debt Payments ($)", key: "otherDebts", type: "number", placeholder: "e.g., 600", min: 0, step: 50, defaultValue: 600 },
      { label: "Desired Mortgage Amount ($)", key: "mortgageAmount", type: "number", placeholder: "e.g., 300000", min: 0, step: 10000, defaultValue: 300000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 6.5", min: 0, max: 30, step: 0.125, defaultValue: 6.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 30", min: 1, max: 50, step: 1, defaultValue: 30 },
    ],
    compute: (inputs) => {
      const grossIncome = Number(inputs.grossIncome);
      const housingPayment = Number(inputs.housingPayment);
      const otherDebts = Number(inputs.otherDebts);
      const mortgageAmount = Number(inputs.mortgageAmount);
      const interestRate = Number(inputs.interestRate);
      const loanTerm = Number(inputs.loanTerm);
      const totalDebts = housingPayment + otherDebts;
      const frontEndDTI = grossIncome > 0 ? Math.round(housingPayment / grossIncome * 10000) / 100 : 0;
      const backEndDTI = grossIncome > 0 ? Math.round(totalDebts / grossIncome * 10000) / 100 : 0;
      const maxHousing28 = grossIncome * 0.28;
      const maxTotalDebt36 = grossIncome * 0.36;
      const maxHousingFromBackend = grossIncome * 0.36 - otherDebts;
      const maxHousingAllowed = Math.min(maxHousing28, maxHousingFromBackend);
      const monthlyRate = interestRate / 12 / 100;
      const N = loanTerm * 12;
      const affordableMortgage = monthlyRate > 0
        ? Math.round(maxHousingAllowed * (Math.pow(1 + monthlyRate, N) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, N)) / 1000) * 1000
        : maxHousingAllowed * N;
      const conventionalFrontOk = frontEndDTI <= 28;
      const conventionalBackOk = backEndDTI <= 36;
      const fhaFrontOk = frontEndDTI <= 31;
      const fhaBackOk = backEndDTI <= 43;
      const usdaFrontOk = frontEndDTI <= 29;
      const usdaBackOk = backEndDTI <= 41;
      const vaBackOk = backEndDTI <= 41;
      const conventionalStatus = conventionalFrontOk && conventionalBackOk ? "Likely Approved" : "May Require Review";
      const fhaStatus = fhaFrontOk && fhaBackOk ? "Likely Approved" : "May Require Review";
      const usdaStatus = usdaFrontOk && usdaBackOk ? "Likely Approved" : "May Require Review";
      const vaStatus = vaBackOk ? "Likely Approved" : "May Require Review";
      return [
        { label: "Gross Monthly Income", key: "grossIncome", value: grossIncome, unit: "$/mo", color: "default" },
        { label: "Monthly Housing Payment", key: "housingPayment", value: housingPayment, unit: "$/mo", color: "blue" },
        { label: "Total Monthly Debts", key: "totalDebts", value: totalDebts, unit: "$/mo", color: "default" },
        { label: "Front-End DTI (Housing Ratio)", key: "frontEndDTI", value: frontEndDTI, unit: "%", color: frontEndDTI <= 28 ? "green" : "red" },
        { label: "Back-End DTI (Total Ratio)", key: "backEndDTI", value: backEndDTI, unit: "%", color: backEndDTI <= 36 ? "green" : "red" },
        { label: "Max Allowable Housing (28%)", key: "maxHousing", value: Math.round(maxHousing28 * 100) / 100, unit: "$/mo", color: "default" },
        { label: "Max Allowable Total Debt (36%)", key: "maxTotalDebt", value: Math.round(maxTotalDebt36 * 100) / 100, unit: "$/mo", color: "default" },
        { label: "Conventional Status", key: "conventionalStatus", value: conventionalStatus, color: conventionalFrontOk && conventionalBackOk ? "green" : "amber" },
        { label: "FHA Status", key: "fhaStatus", value: fhaStatus, color: fhaFrontOk && fhaBackOk ? "green" : "amber" },
        { label: "USDA Status", key: "usdaStatus", value: usdaStatus, color: usdaFrontOk && usdaBackOk ? "green" : "amber" },
        { label: "VA Status", key: "vaStatus", value: vaStatus, color: vaBackOk ? "green" : "amber" },
        { label: "Affordable Mortgage (Based on DTI)", key: "affordableMortgage", value: affordableMortgage, unit: "$", color: "green" },
      ];
    },
    chart: (results) => {
      const front = results.find(r => r.key === "frontEndDTI")?.value as number || 0;
      const back = results.find(r => r.key === "backEndDTI")?.value as number || 0;
      return {
        type: "bar",
        data: {
          labels: ["Front-End DTI", "Back-End DTI", "Conventional Limit (28%)", "Conventional Limit (36%)"],
          datasets: [{
            label: "DTI Ratio (%)",
            data: [front, back, 28, 36],
            backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(99, 102, 241, 0.8)", "rgba(239, 68, 68, 0.4)", "rgba(239, 68, 68, 0.4)"],
            borderColor: ["rgba(34, 197, 94, 1)", "rgba(99, 102, 241, 1)", "rgba(239, 68, 68, 0.6)", "rgba(239, 68, 68, 0.6)"],
            borderWidth: 2,
            borderRadius: 8,
          }],
        },
        options: { responsive: true, plugins: { legend: { display: false } } },
      };
    },
    example: { inputs: { grossIncome: 8000, housingPayment: 1800, otherDebts: 600, mortgageAmount: 300000, interestRate: 6.5, loanTerm: 30 }, results: [] },
    faqs: [
      { question: "What is a debt-to-income ratio?", answer: "DTI compares your monthly debt payments to your gross monthly income. Lenders use it to determine your ability to manage monthly payments and repay a mortgage." },
      { question: "What is the difference between front-end and back-end DTI?", answer: "Front-end DTI (housing ratio) is your housing payment divided by income. Back-end DTI (total ratio) includes all monthly debts plus housing divided by income." },
      { question: "What DTI ratios do conventional loans require?", answer: "Conventional loans typically require a front-end DTI of 28% or less and a back-end DTI of 36% or less. Some lenders allow up to 45-50% with strong compensating factors." },
      { question: "What are the DTI limits for FHA loans?", answer: "FHA loans allow a 31% front-end ratio and 43% back-end ratio. With strong credit and reserves, some borrowers can qualify with higher DTIs up to 50%." },
      { question: "What are USDA and VA loan DTI requirements?", answer: "USDA loans require 29% front-end and 41% back-end. VA loans have no front-end limit but typically require a 41% back-end ratio, though higher ratios may be allowed." },
      { question: "Does DTI include utilities and groceries?", answer: "No, DTI only includes debts that appear on your credit report or are recurring obligations: mortgage, credit cards, car loans, student loans, personal loans, and alimony/child support." },
      { question: "Can I get a mortgage with a high DTI?", answer: "Yes, some loan programs allow higher DTIs with compensating factors like excellent credit (720+), large down payment, substantial reserves, or significant income in certain fields." },
      { question: "How can I lower my DTI to qualify for a mortgage?", answer: "Increase income (overtime, side work), pay down credit card balances, pay off car or student loans, avoid new credit before applying, or consider a co-borrower." },
    ],
    relatedSlugs: ["mortgage-calculator", "home-affordability-calculator", "rent-vs-buy-calculator", "loan-calculator", "emi-calculator", "home-equity-loan-calculator"],
  },
  {
    icon: Bot,
    name: "AI Token Cost Calculator",
    slug: "ai-token-cost-calculator",
    category: "business",
    description: "Estimate your AI API costs for GPT-5, GPT-4o, Claude, Gemini, and custom models based on token usage and request volume.",
    metaTitle: "AI Token Cost Calculator | Estimate AI API Pricing | Measurely",
    metaDescription: "Free AI token cost calculator. Estimate GPT, Claude, and Gemini API costs based on input/output token usage, requests per day, and custom pricing.",
    inputs: [
      { label: "Model", key: "model", type: "select", options: [{ label: "GPT-5", value: "gpt5" }, { label: "GPT-4o", value: "gpt4o" }, { label: "Claude 3.5 Sonnet", value: "claude" }, { label: "Gemini 2.0 Flash", value: "gemini" }, { label: "Custom", value: "custom" }], defaultValue: "gpt4o" },
      { label: "Input Tokens", key: "inputTokens", type: "number", placeholder: "e.g., 1000", min: 0, step: 1, defaultValue: 1000 },
      { label: "Output Tokens", key: "outputTokens", type: "number", placeholder: "e.g., 500", min: 0, step: 1, defaultValue: 500 },
      { label: "Requests Per Day", key: "requestsPerDay", type: "number", placeholder: "e.g., 100", min: 0, step: 1, defaultValue: 100 },
      { label: "Days Per Month", key: "daysPerMonth", type: "number", placeholder: "e.g., 30", min: 1, max: 31, step: 1, defaultValue: 30 },
      { label: "Custom Input Price (per 1M tokens)", key: "customInputPrice", type: "number", placeholder: "e.g., 5", min: 0, step: 0.01, defaultValue: 0 },
      { label: "Custom Output Price (per 1M tokens)", key: "customOutputPrice", type: "number", placeholder: "e.g., 15", min: 0, step: 0.01, defaultValue: 0 },
    ],
    compute: (inputs) => {
      const model = inputs.model as string;
      const inputTokens = Number(inputs.inputTokens);
      const outputTokens = Number(inputs.outputTokens);
      const requestsPerDay = Number(inputs.requestsPerDay);
      const daysPerMonth = Number(inputs.daysPerMonth);
      const customInputPrice = Number(inputs.customInputPrice);
      const customOutputPrice = Number(inputs.customOutputPrice);

      const pricing: Record<string, { input: number; output: number }> = {
        gpt5: { input: 15, output: 60 },
        gpt4o: { input: 2.5, output: 10 },
        claude: { input: 3, output: 15 },
        gemini: { input: 0.1, output: 0.4 },
        custom: { input: customInputPrice, output: customOutputPrice },
      };

      const prices = pricing[model] || pricing.gpt4o;
      const inputPrice = prices.input;
      const outputPrice = prices.output;

      const inputCost = (inputTokens / 1000000) * inputPrice;
      const outputCost = (outputTokens / 1000000) * outputPrice;
      const costPerRequest = inputCost + outputCost;
      const dailyCost = costPerRequest * requestsPerDay;
      const monthlyCost = dailyCost * daysPerMonth;
      const annualCost = monthlyCost * 12;

      return [
        { label: "Input Cost (per request)", key: "inputCost", value: Math.round(inputCost * 100000) / 100000, unit: "$", color: "blue" },
        { label: "Output Cost (per request)", key: "outputCost", value: Math.round(outputCost * 100000) / 100000, unit: "$", color: "green" },
        { label: "Cost Per Request", key: "costPerRequest", value: Math.round(costPerRequest * 100000) / 100000, unit: "$", color: "default" },
        { label: "Daily Cost", key: "dailyCost", value: Math.round(dailyCost * 100) / 100, unit: "$", color: "blue" },
        { label: "Monthly Cost", key: "monthlyCost", value: Math.round(monthlyCost * 100) / 100, unit: "$", color: "amber" },
        { label: "Annual Cost", key: "annualCost", value: Math.round(annualCost * 100) / 100, unit: "$", color: "green" },
      ];
    },
    chart: (results) => {
      const inputCost = results.find(r => r.key === "inputCost")?.value as number || 0;
      const outputCost = results.find(r => r.key === "outputCost")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Input Cost", "Output Cost"],
          datasets: [{
            data: [inputCost, outputCost],
            backgroundColor: ["rgba(59, 130, 246, 0.8)", "rgba(16, 185, 129, 0.8)"],
            borderColor: ["rgba(59, 130, 246, 1)", "rgba(16, 185, 129, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: { inputs: { model: "gpt4o", inputTokens: 1000, outputTokens: 500, requestsPerDay: 100, daysPerMonth: 30, customInputPrice: 0, customOutputPrice: 0 }, results: [] },
    faqs: [
      { question: "What is an AI token?", answer: "A token is the basic unit of text that AI models process. One token is roughly 0.75 words in English. Tokens include words, subwords, punctuation, and spaces. For example, 'Hello, world!' is about 3 tokens." },
      { question: "How much does GPT API cost?", answer: "GPT-4o costs $2.50 per million input tokens and $10 per million output tokens. GPT-5 is priced higher at $15 input and $60 output per million tokens. Prices vary by model and tier." },
      { question: "Can I calculate AI costs before launching?", answer: "Yes, use our AI Token Cost Calculator to estimate costs before launching. Enter your expected token usage, request volume, and model choice to get accurate monthly and annual projections." },
      { question: "Which AI model is cheapest?", answer: "Gemini 2.0 Flash is currently the most cost-effective option at $0.10 per million input tokens and $0.40 per million output tokens. It is ideal for high-volume, simple tasks." },
      { question: "How many tokens does a chatbot use?", answer: "A typical customer support chatbot uses 500-1500 input tokens (conversation history + prompt) and 100-500 output tokens per request. Complex tasks like content generation use significantly more." },
      { question: "Is AI API pricing predictable?", answer: "AI API pricing is generally predictable since providers charge fixed rates per token. However, final costs depend on actual usage patterns, which can vary. Our calculator helps you forecast costs accurately." },
      { question: "Can small businesses afford AI APIs?", answer: "Yes. A small business can run AI-powered customer support for $20-100/month using GPT-4o or Gemini. Costs scale with usage, making AI APIs accessible for businesses of all sizes." },
      { question: "What affects AI token costs?", answer: "Key factors include model choice (premium vs budget), input/output token ratio, request volume, context window size, and caching. Using shorter prompts and budget models reduces costs." },
    ],
    relatedSlugs: [],
  },
  {
    icon: PiggyBank,
    name: "FIRE Number Calculator",
    slug: "fire-number-calculator",
    category: "retirement",
    description: "Calculate your FIRE number - the amount you need to achieve financial independence and retire early.",
    metaTitle: "FIRE Number Calculator | Financial Independence Retire Early Calculator | Measurely",
    metaDescription: "Free FIRE number calculator for India. Calculate how much you need to retire early, your FIRE target, investment gap, and portfolio growth with our Financial Independence Retire Early calculator.",
    inputs: [
      { label: "Current Age", key: "currentAge", type: "number", placeholder: "e.g., 30", min: 18, max: 80, defaultValue: 30 },
      { label: "Desired Retirement Age", key: "retirementAge", type: "number", placeholder: "e.g., 45", min: 25, max: 90, defaultValue: 45 },
      { label: "Annual Expenses (₹)", key: "annualExpenses", type: "number", placeholder: "e.g., 600000", min: 10000, step: 50000, defaultValue: 600000 },
      { label: "Current Investments (₹)", key: "currentInvestments", type: "number", placeholder: "e.g., 1000000", min: 0, step: 100000, defaultValue: 1000000 },
      { label: "Monthly Investment (₹)", key: "monthlyInvestment", type: "number", placeholder: "e.g., 50000", min: 0, step: 5000, defaultValue: 50000 },
      { label: "Expected Annual Return (%)", key: "expectedReturn", type: "number", placeholder: "e.g., 12", min: 0, max: 30, step: 0.5, defaultValue: 12 },
      { label: "Safe Withdrawal Rate (%)", key: "withdrawalRate", type: "number", placeholder: "e.g., 4", min: 1, max: 15, step: 0.1, defaultValue: 4 },
    ],
    compute: (inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retirementAge = Number(inputs.retirementAge);
      const annualExpenses = Number(inputs.annualExpenses);
      const currentInvestments = Number(inputs.currentInvestments);
      const monthlyInvestment = Number(inputs.monthlyInvestment);
      const expectedReturn = Number(inputs.expectedReturn) / 100;
      const withdrawalRate = Number(inputs.withdrawalRate) / 100;

      const years = retirementAge - currentAge;
      const fireNumber = annualExpenses / withdrawalRate;

      const r = expectedReturn;
      const n = years;
      const P = currentInvestments;
      const PMT = monthlyInvestment * 12;

      const fv = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);

      const investmentGap = Math.max(0, fireNumber - fv);
      const monthlyIncome = fireNumber * withdrawalRate / 12;

      return [
        { label: "FIRE Target", key: "fireTarget", value: Math.round(fireNumber * 100) / 100, unit: "₹", color: "green" },
        { label: "Portfolio at Retirement", key: "portfolioAtRetirement", value: Math.round(fv * 100) / 100, unit: "₹", color: "green" },
        { label: "Years Remaining", key: "yearsRemaining", value: years, unit: "years", color: "default" },
        { label: "Estimated Retirement Age", key: "retirementAgeResult", value: retirementAge, unit: "years", color: "blue" },
        { label: "Monthly Retirement Income", key: "monthlyIncome", value: Math.round(monthlyIncome * 100) / 100, unit: "₹/mo", color: "green" },
        { label: "Investment Gap", key: "investmentGap", value: Math.round(investmentGap * 100) / 100, unit: "₹", color: investmentGap > 0 ? "red" : "green" },
      ];
    },
    chart: (results, inputs) => {
      const currentAge = Number(inputs.currentAge);
      const retirementAge = Number(inputs.retirementAge);
      const annualExpenses = Number(inputs.annualExpenses);
      const withdrawalRate = Number(inputs.withdrawalRate) / 100;
      const currentInvestments = Number(inputs.currentInvestments);
      const monthlyInvestment = Number(inputs.monthlyInvestment);
      const expectedReturn = Number(inputs.expectedReturn) / 100;

      const fireNumber = annualExpenses / withdrawalRate;
      const years = retirementAge - currentAge;
      const r = expectedReturn;
      const PMT = monthlyInvestment * 12;
      const P = currentInvestments;

      const labels: string[] = [];
      const portfolioValues: number[] = [];
      const fireTargetLine: number[] = [];

      for (let y = 0; y <= years; y++) {
        const age = currentAge + y;
        labels.push(String(age));
        const fv = P * Math.pow(1 + r, y) + PMT * ((Math.pow(1 + r, y) - 1) / r);
        portfolioValues.push(Math.round(fv * 100) / 100);
        fireTargetLine.push(fireNumber);
      }

      return {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Portfolio Value",
              data: portfolioValues,
              borderColor: "rgba(99, 102, 241, 1)",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "FIRE Target",
              data: fireTargetLine,
              borderColor: "rgba(239, 68, 68, 1)",
              borderDash: [5, 5],
              fill: false,
              tension: 0,
              pointRadius: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
          scales: {
            x: { title: { display: true, text: "Age" } },
            y: {
              title: { display: true, text: "Amount (₹)" },
              ticks: { callback: (v: string | number) => `₹${(Number(v) / 10000000).toFixed(1)}Cr` },
            },
          },
        },
      };
    },
    example: {
      inputs: {
        currentAge: 30,
        retirementAge: 45,
        annualExpenses: 600000,
        currentInvestments: 1000000,
        monthlyInvestment: 50000,
        expectedReturn: 12,
        withdrawalRate: 4,
      },
      results: [],
    },
    faqs: [
      { question: "What is a FIRE number?", answer: "A FIRE number is the total amount of money you need to have invested to achieve financial independence and retire early. It is calculated by dividing your annual expenses by your safe withdrawal rate (typically 4%)." },
      { question: "What is the 4% rule?", answer: "The 4% rule is a retirement withdrawal guideline that suggests you can withdraw 4% of your retirement savings annually (adjusted for inflation) and have a high probability of your savings lasting 30 years. It was based on the Trinity Study." },
      { question: "Can I retire at 45 in India?", answer: "Yes, retiring at 45 in India is possible with careful planning. You need a substantial corpus (typically ₹2-5 crore depending on lifestyle), diversified investments, and a sustainable withdrawal strategy. Our FIRE calculator helps you determine your specific target." },
      { question: "How much money do I need to retire in India?", answer: "For early retirement in India, most FIRE seekers target ₹2-5 crore. This depends on your annual expenses, expected inflation, withdrawal rate, and lifestyle expectations. Use our calculator to find your personalized FIRE number." },
      { question: "Is FIRE realistic in India?", answer: "Yes, the FIRE movement is growing in India. With strong equity returns (12-15% historically from mutual funds), real estate appreciation, and disciplined saving, many Indians are achieving financial independence in their 40s. Key factors include high savings rates (40-60% of income) and smart investing." },
      { question: "How much should I invest monthly for early retirement?", answer: "The amount depends on your current age, target retirement age, and lifestyle. Generally, FIRE seekers aim to save 40-60% of their income. For example, a 30-year-old wanting to retire at 45 with ₹6L annual expenses needs to invest approximately ₹50,000 per month at 12% returns." },
      { question: "What are the risks of early retirement?", answer: "Key risks include inflation eroding purchasing power, unexpected healthcare costs, market volatility in early retirement years (sequence of returns risk), longevity (outliving savings), and lifestyle changes. Mitigation strategies include a diversified portfolio, health insurance, and flexible spending." },
      { question: "How does inflation affect retirement planning?", answer: "Inflation reduces the purchasing power of your savings over time. At 6% inflation, ₹1 crore today will be worth about ₹31 lakh in 20 years. Your FIRE number should account for inflation-adjusted expenses, and your investment strategy should target returns that outpace inflation." },
    ],
    relatedSlugs: ["sip-calculator", "compound-interest-calculator", "swp-calculator", "401k"],
  },
  {
    icon: Wallet,
    name: "Cash Flow Forecast Calculator",
    slug: "cash-flow-forecast-calculator",
    category: "business",
    description: "Forecast your business cash flow over 3, 6, or 12 months. Track income, expenses, and identify potential cash shortages before they happen.",
    metaTitle: "Cash Flow Forecast Calculator | Free Business Cash Flow Tool | Measurely",
    metaDescription: "Free cash flow forecast calculator for businesses and freelancers. Project your monthly cash flow, identify cash shortages, and plan for growth with our easy-to-use financial planning tool.",
    inputs: [
      { label: "Opening Balance ($)", key: "openingBalance", type: "number", placeholder: "e.g., 10000", min: 0, step: 500, defaultValue: 10000 },
      { label: "Monthly Revenue ($)", key: "monthlyRevenue", type: "number", placeholder: "e.g., 25000", min: 0, step: 1000, defaultValue: 25000 },
      { label: "Monthly Fixed Expenses ($)", key: "monthlyFixedExpenses", type: "number", placeholder: "e.g., 8000", min: 0, step: 500, defaultValue: 8000 },
      { label: "Monthly Variable Expenses ($)", key: "monthlyVariableExpenses", type: "number", placeholder: "e.g., 3000", min: 0, step: 500, defaultValue: 3000 },
      { label: "Loan Repayments ($)", key: "loanRepayments", type: "number", placeholder: "e.g., 1500", min: 0, step: 100, defaultValue: 1500 },
      { label: "Taxes ($)", key: "taxes", type: "number", placeholder: "e.g., 2000", min: 0, step: 500, defaultValue: 2000 },
      { label: "Other Income ($)", key: "otherIncome", type: "number", placeholder: "e.g., 1000", min: 0, step: 100, defaultValue: 1000 },
      { label: "Other Expenses ($)", key: "otherExpenses", type: "number", placeholder: "e.g., 500", min: 0, step: 100, defaultValue: 500 },
      { label: "Forecast Period", key: "forecastPeriod", type: "select", options: [{ label: "3 Months", value: "3" }, { label: "6 Months", value: "6" }, { label: "12 Months", value: "12" }], defaultValue: "6" },
    ],
    compute: (inputs) => {
      const openingBalance = Number(inputs.openingBalance);
      const revenue = Number(inputs.monthlyRevenue);
      const fixedExpenses = Number(inputs.monthlyFixedExpenses);
      const variableExpenses = Number(inputs.monthlyVariableExpenses);
      const loanRepayments = Number(inputs.loanRepayments);
      const taxes = Number(inputs.taxes);
      const otherIncome = Number(inputs.otherIncome);
      const otherExpenses = Number(inputs.otherExpenses);
      const months = Number(inputs.forecastPeriod);

      const totalMonthlyIncome = revenue + otherIncome;
      const totalMonthlyExpenses = fixedExpenses + variableExpenses + loanRepayments + taxes + otherExpenses;
      const netMonthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
      const totalIncomePeriod = totalMonthlyIncome * months;
      const totalExpensesPeriod = totalMonthlyExpenses * months;
      const finalClosingBalance = openingBalance + (netMonthlyCashFlow * months);
      const hasDeficit = finalClosingBalance < 0;

      const cashRunway = netMonthlyCashFlow > 0 ? Infinity : Math.floor(openingBalance / Math.abs(netMonthlyCashFlow));

      const worstBalance = Math.min(openingBalance, ...Array.from({ length: months }, (_, i) => openingBalance + netMonthlyCashFlow * (i + 1)));

      return [
        { label: "Monthly Net Cash Flow", key: "netMonthlyCashFlow", value: Math.round(netMonthlyCashFlow * 100) / 100, unit: "$", color: netMonthlyCashFlow >= 0 ? "green" : "red" },
        { label: "Total Monthly Income", key: "totalMonthlyIncome", value: Math.round(totalMonthlyIncome * 100) / 100, unit: "$", color: "green" },
        { label: "Total Monthly Expenses", key: "totalMonthlyExpenses", value: Math.round(totalMonthlyExpenses * 100) / 100, unit: "$", color: "red" },
        { label: "Total Income (Period)", key: "totalIncomePeriod", value: Math.round(totalIncomePeriod * 100) / 100, unit: "$", color: "green" },
        { label: "Total Expenses (Period)", key: "totalExpensesPeriod", value: Math.round(totalExpensesPeriod * 100) / 100, unit: "$", color: "red" },
        { label: "Final Closing Balance", key: "finalClosingBalance", value: Math.round(finalClosingBalance * 100) / 100, unit: "$", color: hasDeficit ? "red" : "green" },
        { label: "Cash Status", key: "cashStatus", value: hasDeficit ? "Cash Deficit" : "Cash Surplus", color: hasDeficit ? "red" : "green" },
        { label: "Worst Month Balance", key: "worstBalance", value: Math.round(worstBalance * 100) / 100, unit: "$", color: worstBalance < 0 ? "red" : "amber" },
        { label: "Cash Runway", key: "cashRunway", value: cashRunway === Infinity ? "Stable" : `${cashRunway} months`, color: cashRunway === Infinity ? "green" : "amber" },
      ];
    },
    chart: (results, inputs) => {
      const openingBalance = Number(inputs.openingBalance);
      const revenue = Number(inputs.monthlyRevenue);
      const fixedExpenses = Number(inputs.monthlyFixedExpenses);
      const variableExpenses = Number(inputs.monthlyVariableExpenses);
      const loanRepayments = Number(inputs.loanRepayments);
      const taxes = Number(inputs.taxes);
      const otherIncome = Number(inputs.otherIncome);
      const otherExpenses = Number(inputs.otherExpenses);
      const months = Number(inputs.forecastPeriod);

      const totalMonthlyIncome = revenue + otherIncome;
      const totalMonthlyExpenses = fixedExpenses + variableExpenses + loanRepayments + taxes + otherExpenses;
      const netMonthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;

      const monthNames = ["Month 1", "Month 2", "Month 3", "Month 4", "Month 5", "Month 6", "Month 7", "Month 8", "Month 9", "Month 10", "Month 11", "Month 12"];

      let balance = openingBalance;
      const closingBalances: number[] = [];
      const labels: string[] = [];
      const incomeData: number[] = [];
      const expenseData: number[] = [];

      for (let i = 0; i < months; i++) {
        balance += netMonthlyCashFlow;
        labels.push(monthNames[i]);
        closingBalances.push(Math.round(balance * 100) / 100);
        incomeData.push(Math.round(totalMonthlyIncome * 100) / 100);
        expenseData.push(Math.round(totalMonthlyExpenses * 100) / 100);
      }

      return {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Closing Balance",
              data: closingBalances,
              borderColor: "rgba(99, 102, 241, 1)",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Monthly Income",
              data: incomeData,
              borderColor: "rgba(34, 197, 94, 1)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              fill: false,
              tension: 0.4,
              borderDash: [5, 5],
            },
            {
              label: "Monthly Expenses",
              data: expenseData,
              borderColor: "rgba(239, 68, 68, 1)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              fill: false,
              tension: 0.4,
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
          scales: {
            x: { title: { display: true, text: "Month" } },
            y: { title: { display: true, text: "Amount ($)" } },
          },
        },
      };
    },
    example: {
      inputs: {
        openingBalance: 10000,
        monthlyRevenue: 25000,
        monthlyFixedExpenses: 8000,
        monthlyVariableExpenses: 3000,
        loanRepayments: 1500,
        taxes: 2000,
        otherIncome: 1000,
        otherExpenses: 500,
        forecastPeriod: "6",
      },
      results: [],
    },
    faqs: [
      { question: "What is cash flow forecasting?", answer: "Cash flow forecasting is the process of estimating the flow of cash in and out of your business over a future period. It helps you predict your cash position, identify potential shortages, and make informed financial decisions about spending, investments, and growth." },
      { question: "How accurate are cash flow forecasts?", answer: "Accuracy depends on the reliability of your assumptions. Short-term forecasts (1-3 months) can be 90-95% accurate with good data. Longer forecasts (6-12 months) are less precise but still valuable for trend analysis and strategic planning. Regularly updating your forecast with actual results improves accuracy over time." },
      { question: "Why do startups need cash flow planning?", answer: "Startups face high uncertainty, irregular revenue, and significant upfront costs. Cash flow planning helps founders avoid running out of money, time fundraising efforts, negotiate better payment terms, and make data-driven decisions about hiring and scaling. Many startups fail due to poor cash management despite having viable products." },
      { question: "How often should cash flow be reviewed?", answer: "We recommend reviewing your cash flow forecast weekly for businesses with tight margins or rapid growth, and at least monthly for established businesses. Regular reviews help you spot trends early, adjust spending, and take corrective action before cash shortages become critical." },
      { question: "What is positive cash flow?", answer: "Positive cash flow means your business is bringing in more money than it spends over a given period. This is a sign of financial health, giving you the ability to reinvest in growth, build reserves, pay down debt, and weather unexpected downturns." },
      { question: "What causes negative cash flow?", answer: "Common causes include seasonal revenue dips, delayed customer payments, excessive overhead, rapid expansion without corresponding revenue, high debt repayments, inventory overstock, and unexpected expenses. Our calculator helps you identify which factors impact your cash position most." },
      { question: "Can small businesses use this calculator?", answer: "Yes. This calculator is designed for businesses of all sizes, including freelancers, solopreneurs, small businesses, and startups. Simply enter your expected monthly figures and forecast period to get instant projections and identify potential cash gaps." },
      { question: "How can I improve my cash flow?", answer: "Strategies include: invoicing promptly and following up on late payments, negotiating longer payment terms with suppliers, reducing discretionary expenses, offering discounts for early payment, diversifying revenue streams, building a cash reserve, and using short-term financing strategically during cash gaps." },
    ],
    relatedSlugs: ["roi-calculator", "freelance-rate-calculator", "tax-calculator", "debt-to-income-ratio-calculator-for-mortgage-approval", "ai-token-cost-calculator"],
  },
  {
    icon: Receipt,
    name: "Estimated Tax Calculator for Self-Employed",
    slug: "estimated-tax-calculator-self-employed",
    category: "finance",
    description: "Estimate your quarterly self-employment taxes including federal income tax, self-employment tax, and safe harbor payments.",
    metaTitle: "Estimated Tax Calculator for Self-Employed | Free Quarterly Tax Estimator",
    metaDescription: "Free estimated tax calculator for freelancers, contractors, and self-employed. Calculate quarterly tax payments, self-employment tax, and safe harbor amounts for 2026.",
    inputs: [
      { label: "Business Income", key: "income", type: "number", placeholder: "e.g., 80000", min: 0, step: 1000, defaultValue: 80000 },
      { label: "Business Expenses", key: "expenses", type: "number", placeholder: "e.g., 15000", min: 0, step: 500, defaultValue: 15000 },
      { label: "State", key: "state", type: "select", options: [
        { label: "No State Tax", value: "none" },
        { label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" },
        { label: "Arizona", value: "AZ" }, { label: "Arkansas", value: "AR" },
        { label: "California", value: "CA" }, { label: "Colorado", value: "CO" },
        { label: "Connecticut", value: "CT" }, { label: "Delaware", value: "DE" },
        { label: "Florida", value: "FL" }, { label: "Georgia", value: "GA" },
        { label: "Hawaii", value: "HI" }, { label: "Idaho", value: "ID" },
        { label: "Illinois", value: "IL" }, { label: "Indiana", value: "IN" },
        { label: "Iowa", value: "IA" }, { label: "Kansas", value: "KS" },
        { label: "Kentucky", value: "KY" }, { label: "Louisiana", value: "LA" },
        { label: "Maine", value: "ME" }, { label: "Maryland", value: "MD" },
        { label: "Massachusetts", value: "MA" }, { label: "Michigan", value: "MI" },
        { label: "Minnesota", value: "MN" }, { label: "Mississippi", value: "MS" },
        { label: "Missouri", value: "MO" }, { label: "Montana", value: "MT" },
        { label: "Nebraska", value: "NE" }, { label: "Nevada", value: "NV" },
        { label: "New Hampshire", value: "NH" }, { label: "New Jersey", value: "NJ" },
        { label: "New Mexico", value: "NM" }, { label: "New York", value: "NY" },
        { label: "North Carolina", value: "NC" }, { label: "North Dakota", value: "ND" },
        { label: "Ohio", value: "OH" }, { label: "Oklahoma", value: "OK" },
        { label: "Oregon", value: "OR" }, { label: "Pennsylvania", value: "PA" },
        { label: "Rhode Island", value: "RI" }, { label: "South Carolina", value: "SC" },
        { label: "South Dakota", value: "SD" }, { label: "Tennessee", value: "TN" },
        { label: "Texas", value: "TX" }, { label: "Utah", value: "UT" },
        { label: "Vermont", value: "VT" }, { label: "Virginia", value: "VA" },
        { label: "Washington", value: "WA" }, { label: "West Virginia", value: "WV" },
        { label: "Wisconsin", value: "WI" }, { label: "Wyoming", value: "WY" },
      ], defaultValue: "none" },
      { label: "Filing Status", key: "filingStatus", type: "select", options: [
        { label: "Single", value: "single" },
        { label: "Married Filing Jointly", value: "married" },
        { label: "Head of Household", value: "head" },
      ], defaultValue: "single" },
      { label: "Other Income", key: "otherIncome", type: "number", placeholder: "e.g., 5000", min: 0, step: 500, defaultValue: 0 },
      { label: "Retirement Contributions", key: "retirementContrib", type: "number", placeholder: "e.g., 7000", min: 0, step: 500, defaultValue: 0 },
      { label: "Health Insurance Deduction", key: "healthInsurance", type: "number", placeholder: "e.g., 6000", min: 0, step: 500, defaultValue: 0 },
      { label: "Estimated Tax Already Paid", key: "taxPaid", type: "number", placeholder: "e.g., 2000", min: 0, step: 500, defaultValue: 0 },
      { label: "Business Mileage (miles)", key: "mileage", type: "number", placeholder: "e.g., 5000", min: 0, step: 100, defaultValue: 0 },
      { label: "Home Office Deduction", key: "homeOffice", type: "number", placeholder: "e.g., 1500", min: 0, step: 100, defaultValue: 0 },
      { label: "Age", key: "age", type: "number", placeholder: "e.g., 35", min: 18, max: 100, step: 1, defaultValue: 35 },
      { label: "Dependents", key: "dependents", type: "number", placeholder: "e.g., 0", min: 0, max: 20, step: 1, defaultValue: 0 },
      { label: "Quarter", key: "quarter", type: "select", options: [
        { label: "Q1 (Jan-Mar)", value: "1" },
        { label: "Q2 (Apr-Jun)", value: "2" },
        { label: "Q3 (Jul-Sep)", value: "3" },
        { label: "Q4 (Oct-Dec)", value: "4" },
      ], defaultValue: "1" },
    ],
    compute: (inputs) => {
      const income = Number(inputs.income);
      const expenses = Number(inputs.expenses);
      const otherIncome = Number(inputs.otherIncome);
      const retirementContrib = Number(inputs.retirementContrib);
      const healthInsurance = Number(inputs.healthInsurance);
      const taxPaid = Number(inputs.taxPaid);
      const mileage = Number(inputs.mileage);
      const homeOffice = Number(inputs.homeOffice);
      const age = Number(inputs.age);
      const dependents = Number(inputs.dependents);
      const quarter = Number(inputs.quarter);
      const filing = inputs.filingStatus as string;
      const state = inputs.state as string;

      const mileageRate = 0.70;
      const mileageDeduction = mileage * mileageRate;
      const netBusinessIncome = Math.max(0, income - expenses);
      const additionalDeductions = retirementContrib + healthInsurance + homeOffice + mileageDeduction;

      const stdDeduction = filing === "single" ? 14600 : filing === "head" ? 21900 : 29200;
      const personalExemption = dependents * 0;
      const totalDeductions = stdDeduction + additionalDeductions + personalExemption;

      const totalIncome = netBusinessIncome + otherIncome;
      const taxableIncome = Math.max(0, totalIncome - totalDeductions);

      const isOlder = age >= 65;
      const additionalStdDeduction = isOlder ? (filing === "single" || filing === "head" ? 1950 : 1550) : 0;
      const adjustedTaxableIncome = Math.max(0, taxableIncome - additionalStdDeduction);

      let federalTax = 0;
      const brackets = filing === "married"
        ? [{ rate: 10, limit: 23200 }, { rate: 12, limit: 94300 }, { rate: 22, limit: 201050 }, { rate: 24, limit: 383900 }, { rate: 32, limit: 487450 }, { rate: 35, limit: 731200 }]
        : filing === "head"
        ? [{ rate: 10, limit: 16550 }, { rate: 12, limit: 63100 }, { rate: 22, limit: 100500 }, { rate: 24, limit: 191950 }, { rate: 32, limit: 243700 }, { rate: 35, limit: 609350 }]
        : [{ rate: 10, limit: 11600 }, { rate: 12, limit: 47150 }, { rate: 22, limit: 100525 }, { rate: 24, limit: 191950 }, { rate: 32, limit: 243725 }, { rate: 35, limit: 609350 }];

      let remaining = adjustedTaxableIncome;
      let prevLimit = 0;
      for (const b of brackets) {
        const taxable = Math.min(Math.max(remaining, 0), b.limit - prevLimit);
        federalTax += taxable * b.rate / 100;
        remaining -= taxable;
        prevLimit = b.limit;
        if (remaining <= 0) break;
      }
      if (remaining > 0) federalTax += remaining * 37 / 100;

      const selfEmploymentBase = netBusinessIncome * 0.9235;
      const socialSecuritySE = Math.min(selfEmploymentBase, 168600) * 0.124;
      const medicareSE = selfEmploymentBase * 0.029;
      const selfEmploymentTax = socialSecuritySE + medicareSE;
      const seDeduction = selfEmploymentTax / 2;

      const childTaxCredit = dependents * 2000;
      const earnedIncomeCredit = 0;
      const totalCredits = childTaxCredit + earnedIncomeCredit;

      const annualTaxBeforeCredits = federalTax + selfEmploymentTax - seDeduction;
      const totalAnnualTax = Math.max(0, annualTaxBeforeCredits - totalCredits);

      const effectiveRate = totalIncome > 0 ? Math.round(totalAnnualTax / totalIncome * 10000) / 100 : 0;

      const safeHarborAmount = totalAnnualTax;
      const remainingTax = Math.max(0, totalAnnualTax - taxPaid);

      const quarterFactors: Record<number, number> = { 1: 0.25, 2: 0.50, 3: 0.75, 4: 1.0 };
      const factor = quarterFactors[quarter] || 0.25;
      const quarterlyPayment = Math.round(remainingTax * factor * 100) / 100;
      const fullQuarterlyPayment = Math.round(remainingTax * 0.25 * 100) / 100;

      const refundOrDue = taxPaid > totalAnnualTax ? taxPaid - totalAnnualTax : 0;
      const balanceDue = totalAnnualTax > taxPaid ? totalAnnualTax - taxPaid : 0;

      const grossIncome = income + otherIncome;
      const netProfit = netBusinessIncome - expenses;

      return [
        { label: "Quarterly Payment", key: "quarterlyPayment", value: quarterlyPayment, unit: "$", color: "red" },
        { label: "Annual Tax", key: "totalAnnualTax", value: Math.round(totalAnnualTax * 100) / 100, unit: "$", color: "red" },
        { label: "Federal Income Tax", key: "federalTax", value: Math.round(federalTax * 100) / 100, unit: "$", color: "red" },
        { label: "Self-Employment Tax", key: "selfEmploymentTax", value: Math.round(selfEmploymentTax * 100) / 100, unit: "$", color: "amber" },
        { label: "Effective Tax Rate", key: "effectiveRate", value: effectiveRate, unit: "%", color: "blue" },
        { label: "Taxable Income", key: "taxableIncome", value: Math.round(adjustedTaxableIncome * 100) / 100, unit: "$", color: "default" },
        { label: "Deductions Total", key: "totalDeductions", value: Math.round(totalDeductions * 100) / 100, unit: "$", color: "green" },
        { label: "Net Business Income", key: "netBusinessIncome", value: Math.round(netBusinessIncome * 100) / 100, unit: "$", color: "blue" },
        { label: "Safe Harbor Amount", key: "safeHarborAmount", value: Math.round(safeHarborAmount * 100) / 100, unit: "$", color: "default" },
        { label: "Remaining Tax Due", key: "remainingTax", value: Math.round(remainingTax * 100) / 100, unit: "$", color: balanceDue > 0 ? "red" : "green" },
        { label: "Estimated Refund", key: "estimatedRefund", value: refundOrDue > 0 ? Math.round(refundOrDue * 100) / 100 : 0, unit: "$", color: "green" },
        { label: "Balance Due", key: "balanceDue", value: balanceDue > 0 ? Math.round(balanceDue * 100) / 100 : 0, unit: "$", color: "red" },
      ];
    },
    chart: (results, inputs) => {
      const federal = results.find(r => r.key === "federalTax")?.value as number || 0;
      const seTax = results.find(r => r.key === "selfEmploymentTax")?.value as number || 0;
      const deductions = results.find(r => r.key === "totalDeductions")?.value as number || 0;
      const netIncome = results.find(r => r.key === "netBusinessIncome")?.value as number || 0;
      const remaining = results.find(r => r.key === "remainingTax")?.value as number || 0;
      const annual = results.find(r => r.key === "totalAnnualTax")?.value as number || 0;
      return {
        type: "doughnut",
        data: {
          labels: ["Federal Income Tax", "Self-Employment Tax", "Deductions & Savings"],
          datasets: [{
            data: [federal, seTax, deductions],
            backgroundColor: ["rgba(239, 68, 68, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(239, 68, 68, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: {
      inputs: { income: 80000, expenses: 15000, state: "none", filingStatus: "single", otherIncome: 5000, retirementContrib: 7000, healthInsurance: 6000, taxPaid: 2000, mileage: 5000, homeOffice: 1500, age: 35, dependents: 0, quarter: "1" },
      results: [],
    },
    faqs: [
      { question: "What are estimated taxes?", answer: "Estimated taxes are quarterly payments made to the IRS by individuals who receive income not subject to withholding, such as self-employment income, freelance earnings, investment income, or rental income. These payments cover income tax and self-employment tax throughout the year." },
      { question: "Who has to pay quarterly taxes?", answer: "You must pay estimated quarterly taxes if you expect to owe at least $1,000 in tax when your return is filed and your withholding and refundable credits are less than the smaller of: 90% of your current year tax, or 100% of your previous year tax (110% if your AGI was over $150,000)." },
      { question: "How do freelancers calculate estimated taxes?", answer: "Freelancers calculate estimated taxes by: 1) Estimating their annual net income (revenue minus expenses), 2) Calculating self-employment tax (15.3% of 92.35% of net income), 3) Computing federal income tax using progressive brackets, 4) Subtracting deductions and credits, 5) Dividing the total by 4 to get each quarterly payment." },
      { question: "What happens if I miss a quarterly payment?", answer: "Missing a quarterly payment can result in IRS penalties and interest charges. The penalty is calculated based on how much you underpaid and for how long. The underpayment penalty applies even if you pay the full amount by the tax filing deadline (April 15)." },
      { question: "Can I pay estimated taxes online?", answer: "Yes, you can pay estimated taxes online through the IRS Direct Pay system, Electronic Federal Tax Payment System (EFTPS), or by credit/debit card. You can also mail a check with Form 1040-ES vouchers." },
      { question: "Do I have to pay state estimated taxes?", answer: "It depends on your state. Most states with income taxes require estimated tax payments if you expect to owe a certain amount (typically $500-$1,000) on your state return. Check your state's tax authority for specific requirements." },
      { question: "How accurate is an estimated tax calculator?", answer: "An estimated tax calculator provides a close approximation based on the information you enter. For maximum accuracy, use your actual business income and expenses, include all deductions, and update your estimates quarterly as your income changes. Consult a CPA for complex situations." },
      { question: "Can business expenses lower quarterly taxes?", answer: "Yes. Every dollar of legitimate business expense reduces your net income, which directly lowers both your self-employment tax and income tax. Common deductions include home office, vehicle expenses, equipment, software, professional services, health insurance premiums, and retirement contributions." },
    ],
    relatedSlugs: ["paycheck-calculator", "tax-calculator", "freelance-rate-calculator", "roi-calculator", "cash-flow-forecast-calculator", "interest-calculator"],
  },
  {
    icon: House,
    name: "Home Equity Loan Calculator",
    slug: "home-equity-loan-calculator",
    category: "real-estate",
    description: "Estimate your available home equity, maximum borrowing amount, and monthly payments for a home equity loan.",
    metaTitle: "Home Equity Loan Calculator | Free Home Equity Calculator 2026",
    metaDescription: "Free home equity loan calculator. Estimate your available equity, maximum borrowing amount, monthly payments, LTV ratio, and total interest costs.",
    inputs: [
      { label: "Current Home Value", key: "homeValue", type: "number", placeholder: "e.g., 450000", min: 10000, step: 10000, defaultValue: 450000 },
      { label: "Mortgage Balance", key: "mortgageBalance", type: "number", placeholder: "e.g., 250000", min: 0, step: 5000, defaultValue: 250000 },
      { label: "Desired Loan Amount", key: "loanAmount", type: "number", placeholder: "e.g., 100000", min: 0, step: 5000, defaultValue: 100000 },
      { label: "Interest Rate (% p.a.)", key: "interestRate", type: "number", placeholder: "e.g., 7.5", min: 0, max: 30, step: 0.1, defaultValue: 7.5 },
      { label: "Loan Term (Years)", key: "loanTerm", type: "number", placeholder: "e.g., 20", min: 1, max: 50, defaultValue: 20 },
      { label: "Annual Property Tax ($)", key: "propertyTax", type: "number", placeholder: "e.g., 3600", min: 0, step: 100, defaultValue: 0 },
      { label: "Annual Insurance ($)", key: "insurance", type: "number", placeholder: "e.g., 1200", min: 0, step: 50, defaultValue: 0 },
      { label: "Monthly HOA ($)", key: "hoa", type: "number", placeholder: "e.g., 0", min: 0, step: 25, defaultValue: 0 },
      { label: "Closing Costs (%)", key: "closingCosts", type: "number", placeholder: "e.g., 2", min: 0, max: 10, step: 0.5, defaultValue: 2 },
      { label: "Extra Monthly Payment ($)", key: "extraPayment", type: "number", placeholder: "e.g., 100", min: 0, step: 50, defaultValue: 0 },
    ],
    compute: (inputs) => {
      const homeValue = Number(inputs.homeValue);
      const mortgageBalance = Number(inputs.mortgageBalance);
      const loanAmount = Number(inputs.loanAmount);
      const interestRate = Number(inputs.interestRate);
      const loanTerm = Number(inputs.loanTerm);
      const propertyTax = Number(inputs.propertyTax) || 0;
      const insurance = Number(inputs.insurance) || 0;
      const hoa = Number(inputs.hoa) || 0;
      const closingCostPct = Number(inputs.closingCosts) || 0;
      const extraPayment = Number(inputs.extraPayment) || 0;

      const availableEquity = homeValue - mortgageBalance;
      const maxLtv = 80;
      const ltv = ((mortgageBalance + loanAmount) / homeValue) * 100;
      const maxBorrowing = Math.max(0, (homeValue * maxLtv / 100) - mortgageBalance);

      const N = loanTerm * 12;
      const monthlyRate = interestRate / 12 / 100;
      let monthlyPI = 0;
      let totalPayment = 0;
      let totalInterest = 0;
      if (loanAmount > 0 && monthlyRate > 0) {
        monthlyPI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, N) / (Math.pow(1 + monthlyRate, N) - 1);
        totalPayment = monthlyPI * N;
        totalInterest = totalPayment - loanAmount;
      }

      const monthlyTax = propertyTax / 12;
      const monthlyInsurance = insurance / 12;
      const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + hoa;
      const closingCosts = loanAmount * closingCostPct / 100;
      const remainingEquity = Math.max(0, homeValue - (mortgageBalance + loanAmount));

      const results: CalculatorResult[] = [
        { label: "Available Equity", key: "availableEquity", value: Math.round(availableEquity * 100) / 100, unit: "$", color: "green" },
        { label: "Max Borrowing (80% LTV)", key: "maxBorrowing", value: Math.round(maxBorrowing * 100) / 100, unit: "$", color: "blue" },
        { label: "Monthly Payment (P&I)", key: "monthlyPI", value: Math.round(monthlyPI * 100) / 100, unit: "$/mo", color: "blue" },
        { label: "Total Monthly Payment", key: "totalMonthly", value: Math.round(totalMonthly * 100) / 100, unit: "$/mo", color: "green" },
        { label: "Total Interest", key: "totalInterest", value: Math.round(totalInterest * 100) / 100, unit: "$", color: "red" },
        { label: "Total Repayment", key: "totalPayment", value: Math.round(totalPayment * 100) / 100, unit: "$", color: "default" },
        { label: "LTV Ratio", key: "ltv", value: Math.round(ltv * 100) / 100, unit: "%", color: ltv > maxLtv ? "red" : "green" },
        { label: "Remaining Equity", key: "remainingEquity", value: Math.round(remainingEquity * 100) / 100, unit: "$", color: "default" },
        { label: "Closing Costs", key: "closingCosts", value: Math.round(closingCosts * 100) / 100, unit: "$", color: "amber" },
      ];

      if (extraPayment > 0 && loanAmount > 0 && monthlyRate > 0) {
        let balance = loanAmount;
        let month = 0;
        let totalInterestPaid = 0;
        const totalMonthlyPI = monthlyPI + extraPayment;
        while (balance > 0 && month < 600) {
          month++;
          const interestPortion = balance * monthlyRate;
          const principalPortion = Math.min(totalMonthlyPI - interestPortion, balance);
          totalInterestPaid += interestPortion;
          balance -= principalPortion;
        }
        const stdMonths = N;
        const monthsSaved = Math.max(0, stdMonths - month);
        const interestSaved = Math.max(0, totalInterest - totalInterestPaid);
        results.push(
          { label: "Payoff Time", key: "payoffMonths", value: month, unit: "mo", color: "green" },
          { label: "Months Saved", key: "monthsSaved", value: monthsSaved, unit: "mo", color: "green" },
          { label: "Interest Saved", key: "interestSaved", value: Math.round(interestSaved * 100) / 100, unit: "$", color: "green" },
        );
      }

      return results;
    },
    chart: (results, inputs) => {
      const homeValue = Number(inputs.homeValue);
      const mortgageBalance = Number(inputs.mortgageBalance);
      const loanAmount = Number(inputs.loanAmount);
      const remainingEq = Math.max(0, homeValue - mortgageBalance - loanAmount);
      return {
        type: "doughnut",
        data: {
          labels: ["Existing Mortgage", "New Home Equity Loan", "Remaining Equity"],
          datasets: [{
            data: [mortgageBalance, loanAmount, remainingEq],
            backgroundColor: ["rgba(245, 158, 11, 0.8)", "rgba(99, 102, 241, 0.8)", "rgba(34, 197, 94, 0.8)"],
            borderColor: ["rgba(245, 158, 11, 1)", "rgba(99, 102, 241, 1)", "rgba(34, 197, 94, 1)"],
            borderWidth: 2,
          }],
        },
        options: { responsive: true, plugins: { legend: { position: "bottom" } } },
      };
    },
    example: {
      inputs: { homeValue: 450000, mortgageBalance: 250000, loanAmount: 100000, interestRate: 7.5, loanTerm: 20, propertyTax: 3600, insurance: 1200, hoa: 0, closingCosts: 2, extraPayment: 0 },
      results: [],
    },
    faqs: [
      { question: "What is home equity?", answer: "Home equity is the difference between your home's current market value and your outstanding mortgage balance. It represents the portion of your home that you truly own." },
      { question: "How much equity do I need for a home equity loan?", answer: "Most lenders require at least 15-20% equity in your home to qualify for a home equity loan. This means your existing mortgage balance should not exceed 80-85% of your home's value." },
      { question: "What is a good LTV ratio?", answer: "A good LTV ratio for a home equity loan is 80% or lower. This means your combined mortgage balances (existing mortgage plus new loan) should not exceed 80% of your home's current value." },
      { question: "Can I borrow 100% of my equity?", answer: "Most lenders limit borrowing to 80-85% of your home's value (combined LTV). Borrowing 100% is rare and typically comes with higher interest rates and stricter requirements." },
      { question: "Is a HELOC better than a home equity loan?", answer: "A HELOC offers flexible, revolving credit with variable rates, while a home equity loan provides a lump sum with fixed rates. HELOCs are better for ongoing projects, while home equity loans suit one-time expenses." },
      { question: "How is my monthly payment calculated?", answer: "Your monthly payment is calculated using the standard amortization formula, which divides your loan amount into equal monthly payments over the loan term, including both principal and interest." },
      { question: "Does my credit score affect borrowing?", answer: "Yes, your credit score affects both your eligibility and interest rate. Higher scores (740+) typically qualify for the best rates, while lower scores may result in higher rates or denial." },
      { question: "What are closing costs for a home equity loan?", answer: "Closing costs for home equity loans typically range from 2-5% of the loan amount and may include appraisal fees, origination fees, title search, and recording fees." },
      { question: "Can I repay the loan early?", answer: "Most home equity loans allow early repayment without prepayment penalties, but check your specific loan terms. Making extra payments can save significant interest over the life of the loan." },
      { question: "How does a home equity loan affect my taxes?", answer: "Interest on home equity loans may be tax deductible if the funds are used to buy, build, or substantially improve the home that secures the loan. Consult a tax professional for your specific situation." },
    ],
    relatedSlugs: ["mortgage-calculator", "home-affordability-calculator", "loan-calculator", "debt-to-income-ratio-calculator-for-mortgage-approval", "interest-calculator"],
    formula: "Monthly Payment = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is the loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of months. Available Equity = Home Value - Mortgage Balance. LTV = (Mortgage Balance + New Loan) / Home Value × 100.",
  },
  {
    icon: Car,
    name: "Car Depreciation Calculator",
    slug: "car-depreciation-calculator",
    category: "automotive",
    description: "Estimate your vehicle's current value, annual depreciation, and resale value using depreciation curves by type, mileage, and condition.",
    metaTitle: "Car Depreciation Calculator | Free Vehicle Value Estimator 2026",
    metaDescription: "Free car depreciation calculator to estimate current vehicle value, annual depreciation, five-year projection, and resale value. Uses depreciation curves based on type, age, mileage, and condition.",
    inputs: [
      { label: "Purchase Price ($)", key: "purchasePrice", type: "number", placeholder: "e.g., 35000", min: 100, step: 1000, defaultValue: 35000 },
      { label: "Purchase Year", key: "purchaseYear", type: "number", placeholder: "e.g., 2023", min: 1980, max: 2026, step: 1, defaultValue: 2023 },
      { label: "Vehicle Type", key: "vehicleType", type: "select", options: [
        { label: "Sedan", value: "sedan" },
        { label: "SUV", value: "suv" },
        { label: "Truck", value: "truck" },
        { label: "EV", value: "ev" },
        { label: "Luxury", value: "luxury" },
        { label: "Hybrid", value: "hybrid" },
      ], defaultValue: "sedan" },
      { label: "Current Mileage", key: "currentMileage", type: "number", placeholder: "e.g., 30000", min: 0, step: 1000, defaultValue: 30000 },
      { label: "Annual Mileage", key: "annualMileage", type: "number", placeholder: "e.g., 12000", min: 0, step: 500, defaultValue: 12000 },
      { label: "Vehicle Condition", key: "condition", type: "select", options: [
        { label: "Excellent", value: "excellent" },
        { label: "Good", value: "good" },
        { label: "Fair", value: "fair" },
        { label: "Poor", value: "poor" },
      ], defaultValue: "good" },
    ],
    compute: (inputs) => {
      const purchasePrice = Number(inputs.purchasePrice);
      const purchaseYear = Number(inputs.purchaseYear);
      const vehicleType = String(inputs.vehicleType);
      const condition = String(inputs.condition);
      const currentYear = 2026;
      const age = Math.max(0, currentYear - purchaseYear);

      const firstYearRates: Record<string, number> = {
        sedan: 0.20, suv: 0.18, truck: 0.15,
        ev: 0.25, luxury: 0.30, hybrid: 0.20,
      };
      const conditionFactors: Record<string, number> = {
        excellent: 0.85, good: 1.0, fair: 1.15, poor: 1.35,
      };

      const firstYearRate = firstYearRates[vehicleType] || 0.20;
      const conditionFactor = conditionFactors[condition] || 1.0;
      const effectiveAge = Math.max(age, 1);
      const expectedMileage = Math.max(1, effectiveAge * 12000);
      const currentMileage = Number(inputs.currentMileage);
      const mileageRatio = currentMileage / expectedMileage;
      const mileageFactor = mileageRatio < 0.8 ? 0.9 : mileageRatio > 1.2 ? 1.15 : 1.0;

      let currentValue = purchasePrice;
      let totalDepreciation = 0;
      let rate = firstYearRate;

      for (let y = 1; y <= effectiveAge; y++) {
        const adjustment = conditionFactor * mileageFactor;
        const yearDep = currentValue * rate * adjustment;
        currentValue = Math.max(0, currentValue - yearDep);
        totalDepreciation += yearDep;
        rate = Math.max(0.05, rate * 0.85);
      }

      const remainingValue = Math.max(0, purchasePrice - totalDepreciation);
      const avgCostPerYear = effectiveAge > 0 ? totalDepreciation / effectiveAge : 0;
      const avgCostPerMonth = effectiveAge > 0 ? totalDepreciation / (effectiveAge * 12) : 0;
      const avgCostPerMile = currentMileage > 0 ? totalDepreciation / currentMileage : 0;

      let fiveYearValue = purchasePrice;
      let fiveYearRate = firstYearRate;
      for (let y = 1; y <= 5; y++) {
        const adj = conditionFactor * mileageFactor;
        const dep = fiveYearValue * fiveYearRate * adj;
        fiveYearValue = Math.max(0, fiveYearValue - dep);
        fiveYearRate = Math.max(0.05, fiveYearRate * 0.85);
      }
      const fiveYearLoss = purchasePrice - fiveYearValue;

      return [
        { label: "Current Estimated Value", key: "currentValue", value: Math.round(currentValue * 100) / 100, unit: "$", color: "green" },
        { label: "Total Value Lost", key: "totalDepreciation", value: Math.round(totalDepreciation * 100) / 100, unit: "$", color: "red" },
        { label: "Value Retained", key: "valueRetained", value: Math.round(remainingValue / purchasePrice * 10000) / 100, unit: "%", color: "blue" },
        { label: "5-Year Projected Value", key: "fiveYearValue", value: Math.round(fiveYearValue * 100) / 100, unit: "$", color: "green" },
        { label: "5-Year Value Loss", key: "fiveYearLoss", value: Math.round(fiveYearLoss * 100) / 100, unit: "$", color: "red" },
        { label: "Annual Depreciation", key: "avgCostPerYear", value: Math.round(avgCostPerYear * 100) / 100, unit: "$/yr", color: "amber" },
        { label: "Monthly Depreciation", key: "avgCostPerMonth", value: Math.round(avgCostPerMonth * 100) / 100, unit: "$/mo", color: "amber" },
        { label: "Cost Per Mile", key: "avgCostPerMile", value: Math.round(avgCostPerMile * 1000) / 1000, unit: "$/mi", color: "default" },
      ];
    },
    chart: (_results, inputs) => {
      const purchasePrice = Number(inputs.purchasePrice);
      const purchaseYear = Number(inputs.purchaseYear);
      const vehicleType = String(inputs.vehicleType);
      const condition = String(inputs.condition);
      const currentYear = 2026;
      const age = Math.max(0, currentYear - purchaseYear);

      const firstYearRates: Record<string, number> = {
        sedan: 0.20, suv: 0.18, truck: 0.15,
        ev: 0.25, luxury: 0.30, hybrid: 0.20,
      };
      const conditionFactors: Record<string, number> = {
        excellent: 0.85, good: 1.0, fair: 1.15, poor: 1.35,
      };
      const firstYearRate = firstYearRates[vehicleType] || 0.20;
      const conditionFactor = conditionFactors[condition] || 1.0;
      const effectiveAge = Math.max(age, 1);
      const expectedMileage = Math.max(1, effectiveAge * 12000);
      const currentMileage = Number(inputs.currentMileage);
      const mileageRatio = currentMileage / expectedMileage;
      const mileageFactor = mileageRatio < 0.8 ? 0.9 : mileageRatio > 1.2 ? 1.15 : 1.0;

      const labels: string[] = [];
      const values: number[] = [];
      let val = purchasePrice;
      let rate = firstYearRate;

      for (let y = 1; y <= Math.max(effectiveAge, 10); y++) {
        labels.push("Year " + y);
        if (y <= effectiveAge) {
          const adj = conditionFactor * mileageFactor;
          const dep = val * rate * adj;
          val = Math.max(0, val - dep);
          rate = Math.max(0.05, rate * 0.85);
        }
        values.push(Math.round(val * 100) / 100);
        if (y === 10) break;
      }

      return {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: "Vehicle Value ($)",
            data: values,
            borderColor: "rgba(99, 102, 241, 1)",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label: (ctx: { parsed: { y: number } }) => "$" + ctx.parsed.y.toLocaleString(),
              },
            },
          },
          scales: {
            y: { beginAtZero: true, ticks: { callback: (v: string | number) => "$" + Number(v).toLocaleString() } },
          },
        },
      };
    },
    example: { inputs: { purchasePrice: 35000, purchaseYear: 2023, vehicleType: "sedan", currentMileage: 30000, annualMileage: 12000, condition: "good" }, results: [] },
    faqs: [
      { question: "What is car depreciation?", answer: "Car depreciation is the rate at which a vehicle loses its value over time. Most new cars lose 20-30% of their value in the first year and about 50-60% after five years. Depreciation is the single largest cost of vehicle ownership for most drivers." },
      { question: "How much does a new car depreciate in the first year?", answer: "A new car typically depreciates 20-30% in the first year. Luxury vehicles and EVs can lose up to 30-40% in year one, while trucks and SUVs with strong resale value may lose only 15-20%." },
      { question: "Which cars depreciate the least?", answer: "Trucks, SUVs, and high-demand models from brands like Toyota, Honda, and Subaru tend to depreciate the slowest. Luxury vehicles, EVs from newer brands, and discontinued models typically depreciate the fastest." },
      { question: "Does mileage affect resale value?", answer: "Yes, higher mileage significantly reduces resale value. The average driver puts 12,000-15,000 miles per year. Vehicles with significantly lower mileage retain more value, while high-mileage vehicles take a steeper depreciation hit." },
      { question: "Are EVs different from gasoline cars?", answer: "Yes, EVs tend to depreciate faster than gasoline vehicles due to rapid technology improvements, battery degradation concerns, and changing government incentives. However, popular EV models with good range are starting to hold value better." },
      { question: "How can I slow depreciation?", answer: "Keep mileage low, maintain a detailed service history, keep the car clean and well-maintained, choose popular colors (white, silver, black), avoid modifications, and sell before major mileage milestones or warranty expiration." },
      { question: "When should I sell my vehicle?", answer: "The best time to sell is typically between years 3-5 when the steepest depreciation has passed but the car still has relatively low mileage and remaining warranty. Selling before 60,000-80,000 miles often yields the best resale value." },
      { question: "Is depreciation tax deductible for personal vehicles?", answer: "No, depreciation on personal vehicles is not tax deductible. However, if you use your vehicle for business purposes, you may be able to deduct depreciation as a business expense through standard mileage or actual expense methods." },
    ],
    relatedSlugs: ["ev-charging-cost-calculator", "fuel-cost-calculator", "loan-calculator", "interest-calculator", "roi-calculator"],
    formula: "Year 1 Depreciation = Purchase Price × First-Year Rate × Condition × Mileage Adjustment. Subsequent years use a declining balance method where the rate reduces by 15% annually with a 5% floor.",
  },
  {
    icon: HandCoins,
    name: "Severance Pay Calculator",
    slug: "severance-pay-calculator",
    category: "finance",
    description: "Estimate your severance package after layoffs or termination including gross pay, taxes, PTO payout, and total exit compensation.",
    metaTitle: "Severance Pay Calculator | Estimate Your Layoff Compensation (2026) | Measurely",
    metaDescription: "Free severance pay calculator. Estimate your gross severance, net payment after taxes, PTO payout, and total exit compensation package. Plan your finances after a layoff with confidence.",
    inputs: [
      { label: "Annual Salary ($)", key: "annualSalary", type: "number", placeholder: "e.g., 75000", min: 1, step: 1000, defaultValue: 75000 },
      { label: "Pay Frequency", key: "payFrequency", type: "select", options: [{ label: "Weekly (52 pay periods)", value: "weekly" }, { label: "Bi-Weekly (26 pay periods)", value: "biweekly" }, { label: "Semi-Monthly (24 pay periods)", value: "semimonthly" }, { label: "Monthly (12 pay periods)", value: "monthly" }], defaultValue: "biweekly" },
      { label: "Years of Service", key: "yearsOfService", type: "number", placeholder: "e.g., 5", min: 0, step: 0.5, defaultValue: 5 },
      { label: "Weeks of Pay Per Year of Service", key: "weeksPerYear", type: "number", placeholder: "e.g., 1", min: 0, step: 0.5, defaultValue: 1 },
      { label: "Bonus Included?", key: "bonusIncluded", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], defaultValue: "no" },
      { label: "Bonus Amount ($)", key: "bonusAmount", type: "number", placeholder: "e.g., 5000", min: 0, step: 100, defaultValue: 0 },
      { label: "Unused PTO Hours", key: "unusedPTO", type: "number", placeholder: "e.g., 80", min: 0, step: 1, defaultValue: 0 },
      { label: "PTO Hourly Rate ($)", key: "ptoRate", type: "number", placeholder: "e.g., 36.06", min: 0, step: 0.01, defaultValue: 0 },
      { label: "Estimated Tax Rate (%)", key: "taxRate", type: "number", placeholder: "e.g., 25", min: 0, max: 60, step: 0.5, defaultValue: 25 },
      { label: "Other Exit Benefits ($)", key: "otherBenefits", type: "number", placeholder: "e.g., 2000", min: 0, step: 100, defaultValue: 0 },
      { label: "State (Optional)", key: "state", type: "select", options: [{ label: "Select state...", value: "" }, { label: "California", value: "CA" }, { label: "Texas", value: "TX" }, { label: "New York", value: "NY" }, { label: "Florida", value: "FL" }, { label: "Illinois", value: "IL" }, { label: "Pennsylvania", value: "PA" }, { label: "Ohio", value: "OH" }, { label: "Georgia", value: "GA" }, { label: "North Carolina", value: "NC" }, { label: "Michigan", value: "MI" }], defaultValue: "" },
    ],
    compute: (inputs) => {
      const salary = Number(inputs.annualSalary) || 0;
      const years = Number(inputs.yearsOfService) || 0;
      const weeksPerYear = Number(inputs.weeksPerYear) || 0;
      const taxRate = Number(inputs.taxRate) || 0;
      const bonusAmount = Number(inputs.bonusAmount) || 0;
      const ptoHours = Number(inputs.unusedPTO) || 0;
      const ptoRate = Number(inputs.ptoRate) || 0;
      const otherBenefits = Number(inputs.otherBenefits) || 0;

      const weeklySalary = salary / 52;
      const grossSeverance = weeklySalary * weeksPerYear * years;
      const bonusValue = inputs.bonusIncluded === "yes" ? bonusAmount : 0;
      const ptoValue = ptoHours * ptoRate;
      const totalBeforeTax = grossSeverance + bonusValue + ptoValue + otherBenefits;
      const taxEstimate = totalBeforeTax * (taxRate / 100);
      const netPay = totalBeforeTax - taxEstimate;
      const totalExitPackage = netPay + ptoValue + bonusValue + otherBenefits;

      const payPeriodMap: Record<string, string> = { weekly: "week", biweekly: "two weeks", semimonthly: "half-month", monthly: "month" };
      const periodDesc = payPeriodMap[String(inputs.payFrequency)] || "pay period";

      return [
        { label: "Gross Severance", key: "grossSeverance", value: Math.round(grossSeverance * 100) / 100, unit: "$", color: "blue" },
        { label: "Weekly Severance Amount", key: "weeklyAmount", value: Math.round(weeklySalary * weeksPerYear * years / Math.max(1, years)) / 100, unit: "$", color: "default" },
        { label: "Estimated Tax", key: "taxEstimate", value: Math.round(taxEstimate * 100) / 100, unit: "$", color: "red" },
        { label: "Net Severance Pay", key: "netPay", value: Math.round(netPay * 100) / 100, unit: "$", color: "green" },
        { label: "PTO/Vacation Payout", key: "ptoValue", value: Math.round(ptoValue * 100) / 100, unit: "$", color: "amber" },
        { label: "Bonus Value", key: "bonusValue", value: Math.round(bonusValue * 100) / 100, unit: "$", color: "default" },
        { label: "Other Benefits", key: "otherBenefitsValue", value: Math.round(otherBenefits * 100) / 100, unit: "$", color: "default" },
        { label: "Total Exit Compensation", key: "totalExitPackage", value: Math.round(totalExitPackage * 100) / 100, unit: "$", color: "green" },
      ];
    },
    chart: (results) => ({
      type: "doughnut",
      data: {
        labels: ["Gross Severance", "PTO Payout", "Bonus", "Other Benefits"],
        datasets: [{
          data: [
            results.find(r => r.key === "grossSeverance")?.value || 0,
            results.find(r => r.key === "ptoValue")?.value || 0,
            results.find(r => r.key === "bonusValue")?.value || 0,
            results.find(r => r.key === "otherBenefitsValue")?.value || 0,
          ],
          backgroundColor: ["rgba(99, 102, 241, 0.8)", "rgba(245, 158, 11, 0.8)", "rgba(34, 197, 94, 0.8)", "rgba(148, 163, 184, 0.8)"],
          borderColor: ["rgba(99, 102, 241, 1)", "rgba(245, 158, 11, 1)", "rgba(34, 197, 94, 1)", "rgba(148, 163, 184, 1)"],
          borderWidth: 2,
        }],
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    }),
    example: {
      inputs: { annualSalary: 75000, payFrequency: "biweekly", yearsOfService: 5, weeksPerYear: 1, bonusIncluded: "yes", bonusAmount: 5000, unusedPTO: 80, ptoRate: 36.06, taxRate: 25, otherBenefits: 2000, state: "" },
      results: [],
    },
    faqs: [
      { question: "What is severance pay?", answer: "Severance pay is compensation an employer provides to an employee upon termination of employment. It typically includes a lump sum payment based on years of service, salary, and may also include continued benefits, PTO payout, and other compensation." },
      { question: "How many weeks of severance should I expect?", answer: "A common formula is one week of pay per year of service. However, some employers offer two weeks per year, or more for executives. The actual amount depends on company policy, employment contracts, and negotiation." },
      { question: "Is severance legally required?", answer: "In the United States, severance pay is not legally required under federal law. However, some states have specific requirements, and severance may be mandated by employment contracts, company policies, or collective bargaining agreements." },
      { question: "Is severance taxable?", answer: "Yes, severance pay is considered taxable income by the IRS. Employers typically withhold federal income tax, Social Security, and Medicare taxes. State income tax may also apply depending on your state of residence." },
      { question: "Does unused PTO increase severance?", answer: "Yes, unused PTO is typically paid out separately from severance. Many states require employers to pay out accrued unused vacation time upon termination. This payout is in addition to any severance compensation." },
      { question: "Can I negotiate my severance package?", answer: "Yes, severance packages are often negotiable. You can negotiate for more weeks of pay, extended health benefits, accelerated stock vesting, outplacement services, and a favorable reference. Having an attorney review the agreement can be beneficial." },
      { question: "Will severance affect unemployment benefits?", answer: "Severance pay may affect unemployment benefits depending on state laws. Some states reduce unemployment benefits by the amount of severance received, while others allow you to receive both without reduction." },
      { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on common severance formulas. Actual severance packages vary by employer policy, employment contracts, state laws, and individual circumstances. Use this as a planning tool and consult with an attorney for your specific situation." },
    ],
    relatedSlugs: ["annual-salary-calculator", "paycheck-calculator", "hourly-to-salary-calculator", "tax-calculator", "cash-flow-forecast-calculator"],
    formula: "Gross Severance = (Annual Salary ÷ 52) × Weeks Per Year × Years of Service. Net Severance = Gross Severance + Bonus + PTO + Other Benefits − Taxes.",
  },
  {
    icon: Landmark,
    name: "Inheritance Tax Calculator",
    slug: "inheritance-tax-calculator",
    category: "finance",
    description: "Estimate inheritance and estate taxes based on your jurisdiction, estate value, deductions, exemptions, and number of beneficiaries.",
    metaTitle: "Inheritance Tax Calculator | Free Estate & Inheritance Tax Estimator (2026) | Measurely",
    metaDescription: "Free inheritance tax calculator. Estimate estate taxes, inheritance tax liability, net inheritance, and beneficiary shares. Supports US, UK, Canada, Australia, and NZ tax rules.",
    inputs: [
      { label: "Country", key: "country", type: "select", options: [{ label: "United States", value: "US" }, { label: "United Kingdom", value: "UK" }, { label: "Canada", value: "CA" }, { label: "Australia", value: "AU" }, { label: "New Zealand", value: "NZ" }], defaultValue: "US" },
      { label: "State/Province", key: "state", type: "select", options: [{ label: "Select state...", value: "" }, { label: "California", value: "CA" }, { label: "Texas", value: "TX" }, { label: "New York", value: "NY" }, { label: "Florida", value: "FL" }, { label: "Illinois", value: "IL" }, { label: "Pennsylvania", value: "PA" }, { label: "Ohio", value: "OH" }, { label: "Georgia", value: "GA" }, { label: "North Carolina", value: "NC" }, { label: "Michigan", value: "MI" }, { label: "Maryland", value: "MD" }, { label: "New Jersey", value: "NJ" }, { label: "Oregon", value: "OR" }, { label: "Ontario", value: "ON" }, { label: "British Columbia", value: "BC" }, { label: "Alberta", value: "AB" }], defaultValue: "" },
      { label: "Total Estate Value ($)", key: "estateValue", type: "number", placeholder: "e.g., 2000000", min: 0, step: 10000, defaultValue: 2000000 },
      { label: "Outstanding Debts ($)", key: "debts", type: "number", placeholder: "e.g., 50000", min: 0, step: 1000, defaultValue: 50000 },
      { label: "Funeral Expenses ($)", key: "funeralExpenses", type: "number", placeholder: "e.g., 15000", min: 0, step: 1000, defaultValue: 15000 },
      { label: "Charitable Donations ($)", key: "charitableDonations", type: "number", placeholder: "e.g., 100000", min: 0, step: 1000, defaultValue: 0 },
      { label: "Spouse Exemption?", key: "spouseExemption", type: "radio", options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], defaultValue: "yes" },
      { label: "Number of Beneficiaries", key: "numBeneficiaries", type: "number", placeholder: "e.g., 2", min: 1, max: 100, step: 1, defaultValue: 2 },
      { label: "Lifetime Gifts Already Made ($)", key: "lifetimeGifts", type: "number", placeholder: "e.g., 50000", min: 0, step: 1000, defaultValue: 0 },
      { label: "Other Allowable Deductions ($)", key: "otherDeductions", type: "number", placeholder: "e.g., 10000", min: 0, step: 1000, defaultValue: 0 },
    ],
    compute: (inputs) => {
      const country = String(inputs.country) || "US";
      const estateValue = Number(inputs.estateValue) || 0;
      const debts = Number(inputs.debts) || 0;
      const funeralExpenses = Number(inputs.funeralExpenses) || 0;
      const charitableDonations = Number(inputs.charitableDonations) || 0;
      const spouseExemption = String(inputs.spouseExemption) === "yes";
      const numBeneficiaries = Math.max(1, Number(inputs.numBeneficiaries) || 1);
      const lifetimeGifts = Number(inputs.lifetimeGifts) || 0;
      const otherDeductions = Number(inputs.otherDeductions) || 0;

      const totalDeductions = debts + funeralExpenses + charitableDonations + otherDeductions;
      const grossEstate = estateValue;
      const netEstate = Math.max(0, grossEstate - totalDeductions);

      let taxExemption = 0;
      let taxRate = 0;
      let taxableEstate = 0;
      let estimatedTax = 0;
      let spouseDeduction = 0;

      if (country === "US") {
        taxExemption = spouseExemption ? 13610000 : 13610000;
        spouseDeduction = spouseExemption ? netEstate : 0;
        const taxableBeforeExemption = Math.max(0, netEstate - taxExemption);
        taxableEstate = taxableBeforeExemption;
        taxRate = 0.40;
        estimatedTax = taxableEstate * taxRate;
      } else if (country === "UK") {
        const nilRateBand = 325000;
        const residenceBand = spouseExemption ? 175000 : 0;
        taxExemption = nilRateBand + residenceBand;
        spouseDeduction = spouseExemption ? netEstate : 0;
        taxableEstate = Math.max(0, netEstate - taxExemption);
        taxRate = 0.40;
        estimatedTax = taxableEstate * taxRate;
      } else if (country === "CA") {
        taxExemption = spouseExemption ? netEstate : 0;
        spouseDeduction = spouseExemption ? netEstate : 0;
        taxableEstate = spouseExemption ? 0 : netEstate * 0.5;
        taxRate = 0.25;
        estimatedTax = taxableEstate * taxRate;
      } else {
        taxExemption = spouseExemption ? netEstate : netEstate;
        spouseDeduction = spouseExemption ? netEstate : 0;
        taxableEstate = 0;
        taxRate = 0;
        estimatedTax = 0;
      }

      const totalTaxLiability = Math.max(0, estimatedTax);
      const netInheritance = Math.max(0, netEstate - totalTaxLiability);
      const perBeneficiary = numBeneficiaries > 0 ? netInheritance / numBeneficiaries : netInheritance;
      const effectiveTaxRate = netEstate > 0 ? (totalTaxLiability / netEstate) * 100 : 0;

      return [
        { label: "Gross Estate", key: "grossEstate", value: Math.round(grossEstate * 100) / 100, unit: "$", color: "blue" },
        { label: "Total Deductions", key: "totalDeductions", value: Math.round(totalDeductions * 100) / 100, unit: "$", color: "default" },
        { label: "Taxable Estate", key: "taxableEstate", value: Math.round(taxableEstate * 100) / 100, unit: "$", color: "amber" },
        { label: "Estimated Tax", key: "estimatedTax", value: Math.round(totalTaxLiability * 100) / 100, unit: "$", color: "red" },
        { label: "Net Inheritance", key: "netInheritance", value: Math.round(netInheritance * 100) / 100, unit: "$", color: "green" },
        { label: "Amount Per Beneficiary", key: "perBeneficiary", value: Math.round(perBeneficiary * 100) / 100, unit: "$", color: "green" },
        { label: "Effective Tax Rate", key: "effectiveTaxRate", value: Math.round(effectiveTaxRate * 100) / 100, unit: "%", color: "default" },
        { label: "Spouse Deduction", key: "spouseDeduction", value: Math.round(spouseDeduction * 100) / 100, unit: "$", color: "blue" },
      ];
    },
    chart: (results) => ({
      type: "doughnut",
      data: {
        labels: ["Net Inheritance", "Taxes", "Deductions"],
        datasets: [{
          data: [
            results.find(r => r.key === "netInheritance")?.value || 0,
            results.find(r => r.key === "estimatedTax")?.value || 0,
            results.find(r => r.key === "totalDeductions")?.value || 0,
          ],
          backgroundColor: ["rgba(34, 197, 94, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(148, 163, 184, 0.8)"],
          borderColor: ["rgba(34, 197, 94, 1)", "rgba(239, 68, 68, 1)", "rgba(148, 163, 184, 1)"],
          borderWidth: 2,
        }],
      },
      options: { responsive: true, plugins: { legend: { position: "bottom" } } },
    }),
    example: {
      inputs: { country: "US", state: "", estateValue: 2000000, debts: 50000, funeralExpenses: 15000, charitableDonations: 100000, spouseExemption: "yes", numBeneficiaries: 2, lifetimeGifts: 50000, otherDeductions: 10000 },
      results: [],
    },
    faqs: [
      { question: "What is inheritance tax?", answer: "Inheritance tax is a tax paid by a person who inherits money or property from someone who has died. Unlike estate tax (which is paid by the estate), inheritance tax is paid by the beneficiary. Not all countries or states charge inheritance tax." },
      { question: "Is inheritance tax the same as estate tax?", answer: "No, they differ. Estate tax is levied on the total value of the deceased person's estate before distribution to beneficiaries. Inheritance tax is paid by the beneficiary on what they receive. The US has a federal estate tax but no federal inheritance tax." },
      { question: "Who is exempt from inheritance tax?", answer: "Spouses are typically exempt from inheritance tax in most jurisdictions. Other exemptions may include charities, minor children, and transfers below certain thresholds. Exemptions vary significantly by country and state." },
      { question: "How is inheritance tax calculated?", answer: "Inheritance tax is calculated by determining the estate value, subtracting allowable deductions and exemptions, applying the applicable tax rate, and dividing remaining tax among beneficiaries based on their inheritance shares." },
      { question: "Are inherited assets taxable?", answer: "Inherited assets are generally not subject to income tax. However, any income generated by inherited assets (such as interest, dividends, or rental income) is taxable. Capital gains tax may apply when you sell inherited assets." },
      { question: "Can gifts reduce inheritance tax?", answer: "Yes, making lifetime gifts can reduce inheritance tax liability in many jurisdictions. Gifts made more than 7 years before death often fall outside the estate for tax purposes. Annual gift allowances also apply in many countries." },
      { question: "Do all countries charge inheritance tax?", answer: "No. Many countries have abolished inheritance and estate taxes, including Australia, Canada, New Zealand, Sweden, and Russia. Others like the US and UK have significant exemptions before tax applies." },
      { question: "How accurate is this calculator?", answer: "This calculator provides estimates based on common tax rules for each jurisdiction. Actual tax liability depends on specific circumstances, state laws, and professional assessment. Use this as a planning tool and consult a tax professional." },
    ],
    relatedSlugs: ["net-worth-calculator", "retirement-calculator", "investment-return-calculator", "compound-interest-calculator", "tax-calculator"],
    formula: "Taxable Estate = Gross Estate - Debts - Expenses - Exemptions. Tax = Taxable Estate × Applicable Tax Rate. Net Inheritance = Gross Estate - Deductions - Tax.",
  },
];
