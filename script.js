let fieldCount = 1;
let semesterCount = 1;

function addSubject() {
    fieldCount++;
    const rowCount = tbody.getElementsByTagName('tr').length + 1;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" id="subject${semesterId}_${rowCount}" /></td>
        <td><input type="number" id="creditHours${semesterId}_${rowCount}" /></td>
        <td><input type="number" id="grade${semesterId}_${rowCount}" /></td>
    `;
    tbody.appendChild(newRow);
}

function addSemester() {
    semesterCount++;
    const semestersDiv = document.getElementById('semesters');
    const newSemesterDiv = document.createElement('section');
    newSemesterDiv.id = `semester${semesterCount}`;
    newSemesterDiv.innerHTML = `
        <div class="semesterHeader">
            <h1 class="semester">Semester ${semesterCount}</h1>
            <button type="button" onclick="addSubject(${semesterCount})">Add Subject</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Subjects</th>
                    <th>Credit Hours</th>
                    <th>Scores</th>
                </tr>
            </thead>
            <tbody id="subjectsBody${semesterCount}">
                <tr>
                    <td><input type="text" id="subject${semesterCount}_1" /></td>
                    <td><input type="number" id="creditHours${semesterCount}_1" /></td>
                    <td><input type="number" id="grade${semesterCount}_1" /></td>
                </tr>
            </tbody>
        </table>
    `;
    semestersDiv.appendChild(newSemesterDiv);
}

function calculateGPA() {
    let totalCreditHours = 0;
    let sumOfCalculatedValues = 0;

    for (let s = 1; s <= semesterCount; s++) {
        const tbody = document.getElementById(`subjectsBody${s}`);
        const rows = tbody.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');

            const creditHours = parseInt(cells[1].getElementsByTagName('input')[0].value);
            const grade = parseInt(cells[2].getElementsByTagName('input')[0].value);
    
            console.log(creditHours, grade);
            // Calculate the result
            const result = creditHours * grade;
            console.log(result);

            sumOfCalculatedValues += result;
            totalCreditHours += creditHours;
        }
    }

    const gpa = sumOfCalculatedValues / totalCreditHours;
    const gpaDisplay = document.getElementById('result');
    gpaDisplay.textContent = `GPA: ${gpa.toFixed(2)}`;
}