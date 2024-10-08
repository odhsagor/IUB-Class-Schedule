function generateSchedule() {
    const data = document.getElementById('scheduleData').value.trim();
    if (!data) return;

    const table = document.getElementById('scheduleTable').querySelector('tbody');
    table.innerHTML = ''; 

    const rows = data.split('\n');
    let courseCount = 0;

    rows.forEach(row => {
        const columns = row.split('\t');
        
        if (columns.length >= 5) {
            const courseInfo = columns[0] + ' - ' + columns[1]; 
            const section = columns[2];
            const timeParts = columns[4].split('-');

            if (timeParts.length === 2) {
                const startTime = convertTo12HourFormat(timeParts[0].trim());
                const endTime = convertTo12HourFormat(timeParts[1].trim());
                const roomTime = columns[3] + ' (' + startTime + '-' + endTime + ')';

                const tr = document.createElement('tr');
                const courseTd = document.createElement('td');
                courseTd.textContent = courseInfo;
                tr.appendChild(courseTd);
                const sectionTd = document.createElement('td');
                sectionTd.textContent = section;
                tr.appendChild(sectionTd);
                const roomTimeTd = document.createElement('td');
                roomTimeTd.textContent = roomTime;
                tr.appendChild(roomTimeTd);

                table.appendChild(tr);
                courseCount++;
            }
        }
    });

    document.getElementById('totalCourses').textContent = courseCount;
    document.getElementById('scheduleTableContainer').style.display = 'block';
}

function convertTo12HourFormat(time) {
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    let period = 'AM';
    if (hours >= 12) {
        period = 'PM';
        if (hours > 12) hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
}

function downloadSchedule() {
    const table = document.getElementById('scheduleTableContainer');

    html2canvas(table).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'schedule.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(function(error) {
        console.error("Error capturing the schedule: ", error);
    });
}

function changeTableStyle() {
    const table = document.getElementById('scheduleTable');
    table.classList.toggle('alternate-style');
}

function changeTableColor() {
    const color = document.getElementById('colorPicker').value;
    document.querySelector('table th').style.backgroundColor = color;
}
