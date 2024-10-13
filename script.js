let fieldCount = 1;
let semesterCount = 1;
function createSubjectRow(semesterCount, fieldCount) {
    return `
        <tr>
            <td><input type="text" id="subject${semesterCount}_${fieldCount}"></td>
            <td><input type="number" id="credit${semesterCount}_${fieldCount}" min="0"></td>
            <td><input type="number" id="score${semesterCount}_${fieldCount}" min="0" max="100"></td>
            <td><input type="text" id="grade${semesterCount}_${fieldCount}"></td>
        </tr>
    `;
}

function addSubject(semesterCount) {
    const tableBody = document.getElementById(`subjectsBody${semesterCount}`);
    fieldCount++;
    const newRow = createSubjectRow(semesterCount, fieldCount);
    tableBody.insertAdjacentHTML('beforeend', newRow);
}

// Create a function to generate a new semester block
function addSemester() {
    semesterCount++;
    const newSemesterSection = document.createElement('section');
    newSemesterSection.id = `semester${semesterCount}`;
    newSemesterSection.className = 'semester-container';
    newSemesterSection.innerHTML = `
         <div class="semesterHeader">
            <h1 class="semester">Semester ${semesterCount}</h1>
            <button class="add-subject-btn" onclick="addSubject(${semesterCount})">+ Add Subject</button>
        </div>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Subjects</th>
                        <th>Credit Hours</th>
                        <th>Scores</th>
                        <th>Grade Points</th>
                    </tr>
                </thead>
                <tbody id="subjectsBody${semesterCount}">
                    ${createSubjectRow(semesterCount, 1)}
                </tbody>
            </table>
        </div>
        
        <div class="result">
            <p id="gpaResult${semesterCount}"></p>
            <button onclick="calculateGPA(${semesterCount})">Calculate GPA</button>
        </div>
    `;
    document.querySelector('main').appendChild(newSemesterSection);
}

function calculateGPA(semester) {
    const rows = document.querySelectorAll(`#subjectsBody${semester} tr`);
    let totalCredits = 0;
    let weightedSum = 0;

    rows.forEach((row, index) => {
        const subject = document.getElementById(`subject${semester}_${index + 1}`).value;
        const credit = parseFloat(document.getElementById(`credit${semester}_${index + 1}`).value) || 0;
        const score = parseFloat(document.getElementById(`score${semester}_${index + 1}`).value) || 0;

        console.log(`Subject: ${subject}, Credit: ${credit}, Score: ${score}`);

        totalCredits += credit;
        weightedSum += credit * score;
    });

    const gpa = totalCredits > 0 ? (weightedSum / totalCredits).toFixed(2) : '0.00';
    document.getElementById(`gpaResult${semester}`).textContent = `Your Semester GPA is ${gpa}`;
}
