

async function generatePDF() {

const form = document.getElementById('coverForm');

if (!form.checkValidity()) {

    form.reportValidity();

    return;
}

const nameInput = document.getElementById('studentName').value;

    const btn = document.querySelector('.btn-generate');

    btn.innerText = "Processing...";
    btn.disabled = true;

    // =========================
    // DATA MAPPING
    // =========================

    document.getElementById('pTitle').innerText =
        document.getElementById('courseTitle').value;

    document.getElementById('pCode').innerText =
        document.getElementById('courseCode').value;

    document.getElementById('pCoverType').innerText =
    document.getElementById('coverType').value;

    // =========================
    // TOPIC SECTION
    // =========================

    const topicValue = document.getElementById('topic').value;
    const pTopicRow = document.getElementById('pTopicRow');

    if (topicValue.trim() !== "") {

        document.getElementById('pTopic').innerText = topicValue;

        pTopicRow.style.display = 'block';

    } else {

        pTopicRow.style.display = 'none';
    }

    // =========================
    // STUDENT INFO
    // =========================

// Serial Number Logic
const slInput = document.getElementById('slNo').value;
const slRow = document.getElementById('slRow');
const pSl = document.getElementById('pSl');

if (slInput && slInput.trim() !== "") {
    pSl.innerText = slInput;
    slRow.style.display = "block"; // Jodi kisu lekha thake, taholei shudhu SL:  dekhabe
} else {
    slRow.style.display = "none";  // Jodi faka thake, tahole SL row-tai thkbe nah 
}
    
    document.getElementById('pName').innerText =
        nameInput;

    document.getElementById('pId').innerText =
        document.getElementById('studentId').value;

   const sectionValue =
    document.getElementById('section').value;

const pSectionRow =
    document.getElementById('pSectionRow');

if(sectionValue !== ""){

    document.getElementById('pSection').innerText =
        sectionValue;

    pSectionRow.style.display = 'block';

}

else{

    pSectionRow.style.display = 'none';

}

    document.getElementById('pProgram').innerText =
        document.getElementById('Program').value;

    // =========================
    // TEACHER INFO
    // =========================

    document.getElementById('pTName').innerText =
        document.getElementById('teacherName').value;

    document.getElementById('pTDesig').innerText =
        document.getElementById('teacherDesignation').value;

    document.getElementById('pTDept').innerText =
        document.getElementById('teacherDept').value;

    // =========================
    // DATE FORMAT
    // =========================

    const rawDate = document.getElementById('subDate').value;

    document.getElementById('pDate').innerText =
        rawDate
            ? new Date(rawDate).toLocaleDateString('en-GB')
            : "";

    // =========================
    // PDF GENERATION
    // =========================

// =============================
    // PDF GENERATION (ORIGINAL)
    // =============================
    const element = document.getElementById('pdf-template');

const opt = {
        margin:       0,
        filename:     'IUBAT_Assignment_Cover.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true,
            scrollX: 0,
            scrollY: 0
        },
        jsPDF:  { unit: 'mm', format: 'a4', orientation: 'portrait' } // Letter format bodle A4 kora holo
    };

    try {
        await html2pdf().
        set(opt).
        from(element).
        save();
    } 
        catch (err) {
        console.error(err);
    }   finally {
        btn.innerText = "Download Cover Page";
        btn.disabled = false;
    }
}