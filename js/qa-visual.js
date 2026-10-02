/**
 * qa-visual.js
 * Interactive QA Test Runner & Dashboard Console
 * Represents real test suites based strictly on resume data:
 * Selenium WebDriver, Java, TestNG, REST API validation, Mobile Testing & ERP/Banking workflows
 */

(function initQAVisual() {
  const testData = {
    all: [
      {
        suite: "ERP_StockWorkflow",
        method: "testInwardOutwardStockBalance",
        type: "TestNG",
        status: "PASS",
        time: "142ms",
        desc: "RNets ERP: Validated Inward/Outward inventory balance"
      },
      {
        suite: "Banking_InvestmentFlow",
        method: "validateCriticalAssetWorkflow",
        type: "Functional",
        status: "PASS",
        time: "118ms",
        desc: "Cordiant Asset Solutions: Verified business transaction scenarios"
      },
      {
        suite: "API_QuotationService",
        method: "testQuotationGenerationAPI",
        type: "REST-API",
        status: "PASS",
        time: "86ms",
        desc: "Prime ABGB: Status 200 OK & payload validation"
      },
      {
        suite: "Mobile_ResponsiveUI",
        method: "validateMobileViewports",
        type: "Mobile",
        status: "PASS",
        time: "195ms",
        desc: "RNets Mobile: Navigation, field validation & usability check"
      },
      {
        suite: "JIRA_DefectCycle",
        method: "verifyRetestAndRegressionPass",
        type: "Verification",
        status: "PASS",
        time: "94ms",
        desc: "Metaphi ERP: JIRA defect retested & regression cleared"
      }
    ],
    automation: [
      {
        suite: "Selenium_TestNG_Suite",
        method: "testQuotationPdfExport",
        type: "Selenium",
        status: "PASS",
        time: "215ms",
        desc: "Automated PDF quotation creation & download verification"
      },
      {
        suite: "Selenium_TestNG_Suite",
        method: "testIframesAndListBoxSelection",
        type: "Selenium",
        status: "PASS",
        time: "164ms",
        desc: "Handling dropdowns, popups and iframe navigation in Java"
      },
      {
        suite: "Selenium_TestNG_Suite",
        method: "testUserManagementAccessControl",
        type: "Selenium",
        status: "PASS",
        time: "135ms",
        desc: "Role-based user permissions in ERP module"
      }
    ],
    api: [
      {
        suite: "API_Endpoint_Validation",
        method: "postOrderEnquiryPayload",
        type: "API-POST",
        status: "PASS",
        time: "92ms",
        desc: "Validated request schema and 201 Created response"
      },
      {
        suite: "API_Endpoint_Validation",
        method: "getQuotationDetailsById",
        type: "API-GET",
        status: "PASS",
        time: "74ms",
        desc: "Validated JSON response body, headers and SQL consistency"
      }
    ],
    mobile: [
      {
        suite: "Mobile_Compatibility_Suite",
        method: "validateCrossDeviceResolutions",
        type: "Mobile-UI",
        status: "PASS",
        time: "188ms",
        desc: "Screen size adaptability & navigation flow on mobile devices"
      },
      {
        suite: "Mobile_Compatibility_Suite",
        method: "testFormValidationAndTouchInteractions",
        type: "Usability",
        status: "PASS",
        time: "155ms",
        desc: "Verified required fields, keyboard inputs & touch targets"
      }
    ]
  };

  const consoleContainer = document.getElementById("console-output");
  const tabButtons = document.querySelectorAll(".console-tab");
  const totalCountEl = document.getElementById("qa-metric-total");
  const passCountEl = document.getElementById("qa-metric-pass");
  const rerunBtn = document.getElementById("rerun-suite-btn");

  if (!consoleContainer) return;

  function renderTests(category) {
    const list = testData[category] || testData.all;
    consoleContainer.innerHTML = "";

    list.forEach((item, index) => {
      const line = document.createElement("div");
      line.className = "console-line";
      line.style.animationDelay = `${index * 60}ms`;
      line.innerHTML = `
        <span class="console-badge-pass">${item.status}</span>
        <div class="console-text">
          <strong>[${item.type}]</strong> ${item.suite}.${item.method}()
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
            ${item.desc}
          </div>
        </div>
        <span class="console-duration">${item.time}</span>
      `;
      consoleContainer.appendChild(line);
    });

    if (totalCountEl && passCountEl) {
      const count = list.length;
      totalCountEl.textContent = count;
      passCountEl.textContent = `${count}/${count}`;
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderTests(category);
    });
  });

  if (rerunBtn) {
    rerunBtn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".console-tab.active");
      const category = activeBtn ? activeBtn.getAttribute("data-category") : "all";
      consoleContainer.innerHTML = `
        <div style="color: var(--accent-teal); padding: 1rem 0; font-family: var(--font-mono); font-size: 0.8rem;">
          Executing TestNG Suite runner...
        </div>
      `;
      setTimeout(() => {
        renderTests(category);
      }, 350);
    });
  }

  // Initial render
  renderTests("all");
})();
