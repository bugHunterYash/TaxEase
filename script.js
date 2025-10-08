// Professional Finance Dashboard - Enhanced Version
// Global Variables
let invoiceData = [];
let currentLanguage = 'en';
let trendsChart = null;

// Language Dictionary with Finance Terms
const translations = {
    en: {
        welcomeTitle: "Smart GST Visualizer",
        welcomeSubtitle: "Professional Tax Management & Financial Analytics Platform",
        emptyStateTitle: "No Data Available",
        emptyStateMessage: "Upload your CSV file to unlock powerful analytics and insights",
        uploadNowBtn: "Upload CSV Now",
        totalInvoicesLabel: "Total Invoices",
        totalAmountLabel: "Total Revenue",
        totalGSTLabel: "Total GST",
        avgGSTRateLabel: "Avg Tax Rate",
        quickActionsTitle: "Quick Actions",
        uploadBtn: "Upload New Data",
        trendsBtn: "View Analytics",
        complianceBtn: "Check Compliance",
        uploadTitle: "Upload Invoice Data",
        uploadZoneTitle: "Drag & Drop CSV File",
        uploadZoneSubtitle: "Or click to browse and select file",
        selectFileBtn: "Browse Files",
        downloadSampleBtn: "Download Sample CSV",
        sampleFormatTitle: "Sample CSV Format:",
        uploadSuccessMsg: "File uploaded successfully!",
        trendsTitle: "Financial Analytics Dashboard",
        trendsEmptyTitle: "No Analytics Data",
        trendsEmptyMessage: "Upload CSV data to view comprehensive financial analytics and trends",
        uploadForTrendsBtn: "Upload Data",
        monthlyDataTitle: "Monthly Financial Summary",
        monthHeader: "Month",
        amountHeader: "Revenue",
        gstHeader: "Tax Collected",
        countHeader: "Transactions",
        complianceTitle: "Compliance & Regulatory Status",
        complianceEmptyTitle: "No Compliance Data",
        complianceEmptyMessage: "Upload CSV data to monitor compliance status and regulatory requirements",
        uploadForComplianceBtn: "Upload Data",
        invoiceHeader: "Invoice ID",
        dateHeader: "Transaction Date",
        customerHeader: "Entity Name",
        amountHeader2: "Amount",
        gstRateHeader: "Tax Rate",
        statusHeader: "Status",
        onTime: "Compliant",
        delayed: "Non-Compliant",
        processing: "Processing...",
        uploadingFile: "Uploading and analyzing your financial data",
        success: "Success!",
        successUpload: "Successfully processed",
        records: "records",
        invalidFile: "Invalid File",
        csvFileOnly: "Please select a CSV file.",
        noDataFound: "No Data Found",
        emptyCSV: "The CSV file appears to be empty or invalid.",
        parseError: "Parse Error",
        formatError: "Error parsing CSV file. Please check the format.",
        fileError: "File Error",
        readError: "Error reading the file. Please try again."
    },
    hi: {
        welcomeTitle: "स्मार्ट जीएसटी विज़ुअलाइज़र",
        welcomeSubtitle: "पेशेवर कर प्रबंधन और वित्तीय एनालिटिक्स प्लेटफॉर्म",
        emptyStateTitle: "कोई डेटा उपलब्ध नहीं",
        emptyStateMessage: "शक्तिशाली एनालिटिक्स और इनसाइट्स अनलॉक करने के लिए अपनी CSV फ़ाइल अपलोड करें",
        uploadNowBtn: "CSV अभी अपलोड करें",
        totalInvoicesLabel: "कुल इनवॉइस",
        totalAmountLabel: "कुल राजस्व",
        totalGSTLabel: "कुल जीएसटी",
        avgGSTRateLabel: "औसत कर दर",
        quickActionsTitle: "त्वरित कार्य",
        uploadBtn: "नया डेटा अपलोड करें",
        trendsBtn: "एनालिटिक्स देखें",
        complianceBtn: "अनुपालन जांचें",
        uploadTitle: "इनवॉइस डेटा अपलोड करें",
        uploadZoneTitle: "CSV फ़ाइल ड्रैग और ड्रॉप करें",
        uploadZoneSubtitle: "या ब्राउज़ करने और फ़ाइल चुनने के लिए क्लिक करें",
        selectFileBtn: "फ़ाइलें ब्राउज़ करें",
        downloadSampleBtn: "नमूना CSV डाउनलोड करें",
        sampleFormatTitle: "नमूना CSV प्रारूप:",
        uploadSuccessMsg: "फ़ाइल सफलतापूर्वक अपलोड!",
        trendsTitle: "वित्तीय एनालिटिक्स डैशबोर्ड",
        trendsEmptyTitle: "कोई एनालिटिक्स डेटा नहीं",
        trendsEmptyMessage: "व्यापक वित्तीय एनालिटिक्स और रुझान देखने के लिए CSV डेटा अपलोड करें",
        uploadForTrendsBtn: "डेटा अपलोड करें",
        monthlyDataTitle: "मासिक वित्तीय सारांश",
        monthHeader: "महीना",
        amountHeader: "राजस्व",
        gstHeader: "कर संग्रह",
        countHeader: "लेन-देन",
        complianceTitle: "अनुपालन और नियामक स्थिति",
        complianceEmptyTitle: "कोई अनुपालन डेटा नहीं",
        complianceEmptyMessage: "अनुपालन स्थिति और नियामक आवश्यकताओं की निगरानी के लिए CSV डेटा अपलोड करें",
        uploadForComplianceBtn: "डेटा अपलोड करें",
        invoiceHeader: "इनवॉइस आईडी",
        dateHeader: "लेन-देन की तारीख",
        customerHeader: "संस्था का नाम",
        amountHeader2: "राशि",
        gstRateHeader: "कर दर",
        statusHeader: "स्थिति",
        onTime: "अनुपालित",
        delayed: "गैर-अनुपालित",
        processing: "प्रोसेसिंग...",
        uploadingFile: "आपके वित्तीय डेटा को अपलोड और विश्लेषण किया जा रहा है",
        success: "सफलता!",
        successUpload: "सफलतापूर्वक प्रोसेस किया गया",
        records: "रिकॉर्ड्स",
        invalidFile: "अमान्य फ़ाइल",
        csvFileOnly: "कृपया एक CSV फ़ाइल चुनें।",
        noDataFound: "कोई डेटा नहीं मिला",
        emptyCSV: "CSV फ़ाइल खाली या अमान्य लगती है।",
        parseError: "पार्स त्रुटि",
        formatError: "CSV फ़ाइल पार्स करने में त्रुटि। कृपया प्रारूप जांचें।",
        fileError: "फ़ाइल त्रुटि",
        readError: "फ़ाइल पढ़ने में त्रुटि। कृपया पुनः प्रयास करें।"
    }
};

// Enhanced Sample CSV Data with Finance Focus
const sampleCSVData = `InvoiceNo,InvoiceDate,CustomerName,BaseAmount,GSTRate
TXE001,2025-10-01,Reliance Industries Ltd,250000,18
TXE002,2025-10-02,Tata Consultancy Services,180000,18
TXE003,2025-10-05,Infosys Limited,120000,18
TXE004,2025-10-08,HDFC Bank Ltd,95000,18
TXE005,2025-10-10,Bharti Airtel Ltd,75000,18
TXE006,2025-10-15,Asian Paints Ltd,140000,12
TXE007,2025-09-20,Maruti Suzuki India,65000,28
TXE008,2025-09-25,ITC Limited,88000,12
TXE009,2025-08-30,Hindustan Unilever,110000,18
TXE010,2025-08-15,State Bank of India,45000,18
TXE011,2025-08-20,Wipro Limited,92000,18
TXE012,2025-07-25,Tech Mahindra Ltd,67000,18`;

// Initialize App with Enhanced Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    AOS.init({
        duration: 1200,
        offset: 100,
        once: true,
        easing: 'ease-out-cubic',
        delay: 100
    });
    
    setupEventListeners();
    updateLanguage();
    showEmptyState();
    initializeFinanceElements();
});

// Initialize Finance-specific Elements
function initializeFinanceElements() {
    // Add professional loading states
    addLoadingStates();
    
    // Initialize keyboard shortcuts
    initKeyboardShortcuts();
    
    // Add professional tooltips
    initTooltips();
}

// Enhanced Event Listeners
function setupEventListeners() {
    // File upload
    const csvFileInput = document.getElementById('csvFile');
    if (csvFileInput) {
        csvFileInput.addEventListener('change', handleFileSelect);
    }
    
    // Enhanced drag and drop
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.addEventListener('dragover', handleDragOver);
        uploadZone.addEventListener('dragleave', handleDragLeave);
        uploadZone.addEventListener('drop', handleDrop);
        uploadZone.addEventListener('click', () => {
            const fileInput = document.getElementById('csvFile');
            if (fileInput) fileInput.click();
        });
    }
}

// Enhanced Sample CSV Download
function downloadSampleCSV() {
    const blob = new Blob([sampleCSVData], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TaxEase_Sample_Data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Enhanced success message
    Swal.fire({
        icon: 'success',
        title: currentLanguage === 'hi' ? 'डाउनलोड सफल!' : 'Download Successful!',
        text: currentLanguage === 'hi' ? 'नमूना वित्तीय डेटा डाउनलोड हो गया है।' : 'Sample financial data has been downloaded.',
        showConfirmButton: false,
        timer: 2500,
        background: 'rgba(255,255,255,0.98)',
        backdrop: `rgba(30, 64, 175, 0.1)`,
        customClass: {
            popup: 'finance-popup'
        }
    });
}

// Enhanced State Management
function showEmptyState() {
    const elements = [
        { id: 'emptyState', display: 'block' },
        { id: 'statsSection', display: 'none' },
        { id: 'quickActionsSection', display: 'none' },
        { id: 'trendsEmptyState', display: 'block' },
        { id: 'trendsContent', display: 'none' },
        { id: 'complianceEmptyState', display: 'block' },
        { id: 'complianceContent', display: 'none' }
    ];
    
    elements.forEach(({ id, display }) => {
        const element = document.getElementById(id);
        if (element) element.style.display = display;
    });
}

function showDataState() {
    const elements = [
        { id: 'emptyState', display: 'none' },
        { id: 'statsSection', display: 'flex' },
        { id: 'quickActionsSection', display: 'block' },
        { id: 'trendsEmptyState', display: 'none' },
        { id: 'trendsContent', display: 'block' },
        { id: 'complianceEmptyState', display: 'none' },
        { id: 'complianceContent', display: 'block' }
    ];
    
    elements.forEach(({ id, display }) => {
        const element = document.getElementById(id);
        if (element) element.style.display = display;
    });
}

// Enhanced Language Management
function switchLanguage() {
    currentLanguage = document.getElementById('languageSelect').value;
    updateLanguage();
    
    if (invoiceData.length > 0) {
        updateDashboard();
        updateTrends();
        updateCompliance();
    }
}

function updateLanguage() {
    const texts = translations[currentLanguage];
    
    // Update all text elements
    Object.keys(texts).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            if (element.tagName === 'INPUT') {
                element.placeholder = texts[key];
            } else {
                element.textContent = texts[key];
            }
        }
    });

    // Update navigation text with professional terms
    const navTexts = currentLanguage === 'hi' ? 
        ['डैशबोर्ड', 'CSV अपलोड', 'एनालिटिक्स', 'अनुपालन'] :
        ['Dashboard', 'Upload CSV', 'Analytics', 'Compliance'];
    
    document.querySelectorAll('.nav-text').forEach((el, index) => {
        if (navTexts[index]) el.textContent = navTexts[index];
    });
}

// Enhanced Page Navigation
function showPage(pageId) {
    // Hide all pages with smooth transition
    document.querySelectorAll('.page-content').forEach(page => {
        page.style.display = 'none';
        page.classList.remove('active');
    });

    // Show selected page with animation
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 100);
    }

    // Update navigation state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Activate current nav link
    const navLinks = document.querySelectorAll('.nav-link');
    const pageOrder = ['dashboard', 'upload', 'trends', 'compliance'];
    const currentIndex = pageOrder.indexOf(pageId);
    if (currentIndex >= 0 && navLinks[currentIndex]) {
        navLinks[currentIndex].classList.add('active');
    }

    // Update breadcrumb with professional terminology
    const pageTitles = {
        dashboard: currentLanguage === 'hi' ? 'वित्तीय डैशबोर्ड' : 'Financial Dashboard',
        upload: currentLanguage === 'hi' ? 'डेटा अपलोड' : 'Data Upload',
        trends: currentLanguage === 'hi' ? 'वित्तीय एनालिटिक्स' : 'Financial Analytics',
        compliance: currentLanguage === 'hi' ? 'अनुपालन निगरानी' : 'Compliance Monitoring'
    };
    
    const breadcrumbElement = document.getElementById('currentPage');
    if (breadcrumbElement) {
        breadcrumbElement.textContent = pageTitles[pageId] || pageId;
    }

    // Page-specific actions
    if (pageId === 'trends' && invoiceData.length > 0) {
        setTimeout(() => updateTrends(), 200);
    } else if (pageId === 'compliance' && invoiceData.length > 0) {
        setTimeout(() => updateCompliance(), 200);
    }

    // Reinitialize AOS for new content
    AOS.refresh();
}

// Enhanced File Handling
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.add('dragover');
    }
}

function handleDragLeave(event) {
    event.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.remove('dragover');
    }
}

function handleDrop(event) {
    event.preventDefault();
    const uploadZone = document.getElementById('uploadZone');
    if (uploadZone) {
        uploadZone.classList.remove('dragover');
    }
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

// Enhanced File Processing
function processFile(file) {
    const texts = translations[currentLanguage];
    
    // Validate file type
    if (!file.name.toLowerCase().endsWith('.csv')) {
        Swal.fire({
            icon: 'error',
            title: texts.invalidFile,
            text: texts.csvFileOnly,
            background: 'rgba(255,255,255,0.98)',
            backdrop: `rgba(220, 38, 38, 0.1)`,
            customClass: {
                popup: 'finance-popup'
            }
        });
        return;
    }

    // Show professional loading
    Swal.fire({
        title: texts.processing,
        text: texts.uploadingFile,
        allowOutsideClick: false,
        background: 'rgba(255,255,255,0.98)',
        backdrop: `rgba(30, 64, 175, 0.1)`,
        customClass: {
            popup: 'finance-popup'
        },
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const parsedData = parseCSV(e.target.result);
            
            if (parsedData.length === 0) {
                Swal.fire({
                    icon: 'warning',
                    title: texts.noDataFound,
                    text: texts.emptyCSV,
                    background: 'rgba(255,255,255,0.98)',
                    customClass: {
                        popup: 'finance-popup'
                    }
                });
                return;
            }
            
            // Store data and update UI
            invoiceData = parsedData;
            
            // Show success status
            const uploadStatus = document.getElementById('uploadStatus');
            if (uploadStatus) {
                uploadStatus.style.display = 'block';
            }
            
            // Switch to data state
            showDataState();
            
            // Update dashboard
            updateDashboard();
            
            // Show success notification
            Swal.fire({
                icon: 'success',
                title: texts.success,
                text: `${texts.successUpload} ${invoiceData.length} ${texts.records}.`,
                showConfirmButton: false,
                timer: 3000,
                background: 'rgba(255,255,255,0.98)',
                backdrop: `rgba(34, 197, 94, 0.1)`,
                customClass: {
                    popup: 'finance-popup'
                }
            });

            // Auto-navigate to dashboard
            setTimeout(() => {
                showPage('dashboard');
            }, 3200);

        } catch (error) {
            console.error('Parse error:', error);
            Swal.fire({
                icon: 'error',
                title: texts.parseError,
                text: texts.formatError,
                background: 'rgba(255,255,255,0.98)',
                customClass: {
                    popup: 'finance-popup'
                }
            });
        }
    };

    reader.onerror = function() {
        const texts = translations[currentLanguage];
        Swal.fire({
            icon: 'error',
            title: texts.fileError,
            text: texts.readError,
            background: 'rgba(255,255,255,0.98)',
            customClass: {
                popup: 'finance-popup'
            }
        });
    };

    reader.readAsText(file);
}

// Enhanced CSV Parser with Financial Validation
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n').filter(line => line.trim() !== '');
    if (lines.length < 2) {
        throw new Error('Invalid CSV format - insufficient data');
    }

    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];

    // Validate required headers for financial data
    const requiredHeaders = ['InvoiceNo', 'InvoiceDate', 'CustomerName', 'BaseAmount', 'GSTRate'];
    const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
    
    if (missingHeaders.length > 0) {
        throw new Error(`Missing required financial columns: ${missingHeaders.join(', ')}`);
    }

    // Parse data with enhanced validation
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim());
        if (values.length === headers.length) {
            const row = {};
            
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            
            // Financial data validation
            if (row.InvoiceNo && row.InvoiceNo !== '' && 
                !isNaN(parseFloat(row.BaseAmount)) && 
                !isNaN(parseFloat(row.GSTRate))) {
                
                row.BaseAmount = Math.max(0, parseFloat(row.BaseAmount) || 0);
                row.GSTRate = Math.max(0, Math.min(100, parseFloat(row.GSTRate) || 0));
                data.push(row);
            }
        }
    }

    return data;
}

// Enhanced Dashboard Updates with Financial Metrics
function updateDashboard() {
    if (invoiceData.length === 0) {
        showEmptyState();
        return;
    }

    // Calculate financial metrics
    const totalInvoices = invoiceData.length;
    const totalAmount = invoiceData.reduce((sum, row) => sum + (row.BaseAmount || 0), 0);
    const totalGST = invoiceData.reduce((sum, row) => {
        const base = row.BaseAmount || 0;
        const rate = row.GSTRate || 0;
        return sum + (base * rate / 100);
    }, 0);
    const avgRate = totalInvoices > 0 ? 
        (invoiceData.reduce((sum, row) => sum + (row.GSTRate || 0), 0) / totalInvoices) : 0;

    // Animate dashboard metrics with staggered timing
    const animations = [
        { elementId: 'totalInvoices', value: totalInvoices, delay: 300 },
        { elementId: 'totalAmount', value: totalAmount, prefix: '₹ ', delay: 500 },
        { elementId: 'totalGST', value: totalGST, prefix: '₹ ', delay: 700 },
        { elementId: 'avgGSTRate', value: avgRate, suffix: '%', delay: 900 }
    ];

    animations.forEach(({ elementId, value, prefix = '', suffix = '', delay }) => {
        setTimeout(() => animateFinancialNumber(elementId, value, prefix, suffix), delay);
    });
}

// Enhanced Number Animation for Financial Data
function animateFinancialNumber(elementId, targetValue, prefix = '', suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = targetValue / 80; // Smoother animation with more frames
    const duration = 25; // 25ms intervals for 60fps feel
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (suffix === '%') {
            displayValue = current.toFixed(1);
        } else if (prefix === '₹ ') {
            displayValue = Math.round(current).toLocaleString('en-IN');
        } else {
            displayValue = Math.round(current).toLocaleString('en-IN');
        }
        
        element.textContent = prefix + displayValue + suffix;
    }, duration);
}

// Enhanced Trends Visualization
function updateTrends() {
    if (invoiceData.length === 0) return;

    const monthlyData = calculateMonthlyFinancialData();
    updateFinancialChart(monthlyData);
    updateFinancialTable(monthlyData);
}

function calculateMonthlyFinancialData() {
    const monthlyData = {};
    
    invoiceData.forEach(row => {
        if (!row.InvoiceDate) return;
        
        try {
            const date = new Date(row.InvoiceDate);
            if (isNaN(date.getTime())) return;
            
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = {
                    totalAmount: 0,
                    totalGST: 0,
                    count: 0,
                    avgRate: 0
                };
            }
            
            const amount = row.BaseAmount || 0;
            const gstRate = row.GSTRate || 0;
            const gstAmount = amount * gstRate / 100;
            
            monthlyData[monthKey].totalAmount += amount;
            monthlyData[monthKey].totalGST += gstAmount;
            monthlyData[monthKey].count += 1;
        } catch (error) {
            console.warn('Invalid date format:', row.InvoiceDate);
        }
    });

    // Calculate average rates
    Object.keys(monthlyData).forEach(month => {
        if (monthlyData[month].count > 0) {
            monthlyData[month].avgRate = monthlyData[month].totalGST / monthlyData[month].totalAmount * 100;
        }
    });

    return monthlyData;
}

function updateFinancialChart(monthlyData) {
    const ctx = document.getElementById('trendsChart');
    if (!ctx) return;
    
    const chartContext = ctx.getContext('2d');
    
    if (trendsChart) {
        trendsChart.destroy();
    }

    const labels = Object.keys(monthlyData).sort();
    const amounts = labels.map(month => monthlyData[month].totalAmount);
    const gstAmounts = labels.map(month => monthlyData[month].totalGST);

    trendsChart = new Chart(chartContext, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: currentLanguage === 'hi' ? 'राजस्व' : 'Revenue',
                    data: amounts,
                    borderColor: '#1e40af',
                    backgroundColor: 'rgba(30, 64, 175, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#1e40af',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 3
                },
                {
                    label: currentLanguage === 'hi' ? 'कर संग्रह' : 'Tax Collection',
                    data: gstAmounts,
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(220, 38, 38, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#dc2626',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    borderWidth: 3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: '#374151',
                        font: {
                            family: 'Inter',
                            size: 14,
                            weight: '600'
                        },
                        usePointStyle: true,
                        padding: 25,
                        boxWidth: 12,
                        boxHeight: 12
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    titleColor: '#374151',
                    bodyColor: '#374151',
                    borderColor: '#e5e7eb',
                    borderWidth: 2,
                    cornerRadius: 12,
                    padding: 15,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ₹ ' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#6b7280',
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                        drawBorder: false
                    }
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#6b7280',
                        font: {
                            family: 'Inter',
                            size: 12,
                            weight: '500'
                        },
                        callback: function(value) {
                            return '₹ ' + (value / 1000).toFixed(0) + 'K';
                        }
                    },
                    grid: {
                        color: 'rgba(107, 114, 128, 0.1)',
                        drawBorder: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            }
        }
    });
}

function updateFinancialTable(monthlyData) {
    const tbody = document.querySelector('#trendsTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const sortedMonths = Object.keys(monthlyData).sort().reverse(); // Show recent first
    
    sortedMonths.forEach((month, index) => {
        const data = monthlyData[month];
        const row = tbody.insertRow();
        
        // Add professional styling and animation
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        row.className = 'finance-table-row';
        
        row.innerHTML = `
            <td><strong>${month}</strong></td>
            <td><strong>₹ ${Math.round(data.totalAmount).toLocaleString('en-IN')}</strong></td>
            <td><strong>₹ ${Math.round(data.totalGST).toLocaleString('en-IN')}</strong></td>
            <td><span class="badge bg-primary">${data.count}</span></td>
        `;
        
        // Animate row appearance
        setTimeout(() => {
            row.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Enhanced Compliance Monitoring
function updateCompliance() {
    if (invoiceData.length === 0) return;

    const tbody = document.querySelector('#complianceTable tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    const today = new Date();

    invoiceData.forEach((row, index) => {
        try {
            const invoiceDate = new Date(row.InvoiceDate);
            if (isNaN(invoiceDate.getTime())) return;
            
            const daysDiff = Math.floor((today - invoiceDate) / (1000 * 60 * 60 * 24));
            
            let status, statusClass;
            if (daysDiff <= 30) {
                status = translations[currentLanguage].onTime || 'Compliant';
                statusClass = 'status-success';
            } else {
                status = translations[currentLanguage].delayed || 'Non-Compliant';
                statusClass = 'status-danger';
            }

            const tableRow = tbody.insertRow();
            
            // Enhanced styling and animation
            tableRow.style.opacity = '0';
            tableRow.style.transform = 'translateY(20px)';
            tableRow.className = 'finance-table-row';
            
            tableRow.innerHTML = `
                <td><strong>${row.InvoiceNo}</strong></td>
                <td>${formatDate(row.InvoiceDate)}</td>
                <td>${row.CustomerName}</td>
                <td><strong>₹ ${Math.round(row.BaseAmount || 0).toLocaleString('en-IN')}</strong></td>
                <td><span class="badge bg-info">${row.GSTRate}%</span></td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
            `;
            
            // Animate row appearance
            setTimeout(() => {
                tableRow.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                tableRow.style.opacity = '1';
                tableRow.style.transform = 'translateY(0)';
            }, index * 100);
            
        } catch (error) {
            console.warn('Error processing compliance row:', error);
        }
    });
}

// Utility Functions
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Enhanced Loading States
function addLoadingStates() {
    const style = document.createElement('style');
    style.textContent = `
        .finance-popup {
            font-family: 'Inter', sans-serif !important;
        }
        .finance-table-row:hover {
            background-color: rgba(30, 64, 175, 0.05) !important;
        }
    `;
    document.head.appendChild(style);
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'd':
                    e.preventDefault();
                    showPage('dashboard');
                    break;
                case 'u':
                    e.preventDefault();
                    showPage('upload');
                    break;
                case 't':
                    e.preventDefault();
                    showPage('trends');
                    break;
                case 'c':
                    e.preventDefault();
                    showPage('compliance');
                    break;
            }
        }
    });
}

// Tooltips
function initTooltips() {
    // Add tooltips to important elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = event.target.getAttribute('data-tooltip');
    document.body.appendChild(tooltip);
    
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.top - 30) + 'px';
}

function hideTooltip() {
    const tooltip = document.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    Swal.fire({
        icon: 'error',
        title: 'System Error',
        text: 'A system error occurred. Please refresh the page and try again.',
        background: 'rgba(255,255,255,0.98)',
        customClass: {
            popup: 'finance-popup'
        }
    });
});

// Prevent default drag behaviors
document.addEventListener('dragover', function(e) {
    e.preventDefault();
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
});

// Print and Export Functions
function printReport() {
    window.print();
}

function exportData(format = 'csv') {
    if (invoiceData.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'No Data Available',
            text: 'Please upload financial data before exporting.',
            background: 'rgba(255,255,255,0.98)',
            customClass: {
                popup: 'finance-popup'
            }
        });
        return;
    }
    
    if (format === 'csv') {
        const headers = ['InvoiceNo', 'InvoiceDate', 'CustomerName', 'BaseAmount', 'GSTRate'];
        const csvContent = [
            headers.join(','),
            ...invoiceData.map(row => headers.map(header => row[header]).join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TaxEase_Financial_Export_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}