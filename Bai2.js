
const ds = [
    { name: "An", class: "Web1", score: 8 },
    { name: "Bình", class: "Web2", score: 9 },
    { name: "Chi", class: "Web1", score: 7 },
    { name: "Dũng", class: "Web2", score: 8.5 },
    { name: "Hương", class: "Web1", score: 6 },
    { name: "Lan", class: "Web2", score: 9 }
];

// So sánh tên theo tiếng Việt
function soSanhTen(a, b) {
    return a.localeCompare(b, "vi");
}

// 1. Tính điểm trung bình
export function diemTrungBinh(ds) {
    if (ds.length === 0) return 0;

    return ds.reduce((tong, sv) => tong + sv.score, 0) / ds.length;
}

// 2. Lấy tên, sắp xếp tiếng Việt
export function layTen(ds) {
    return ds.map(sv => sv.name).toSorted(soSanhTen);
}

// 3. Xếp loại theo điểm
export function xepLoai(diem) {
    if (diem >= 8) return "Giỏi";
    if (diem >= 6.5) return "Khá";
    if (diem >= 5) return "Trung bình";
    return "Yếu";
}

// 4. Nhóm sinh viên theo lớp
export function nhomTheoLop(ds) {
    return ds.reduce((nhom, sv) => {
        if (!nhom[sv.class]) {
            nhom[sv.class] = [];
        }

        nhom[sv.class].push(sv);
        return nhom;
    }, {});
}

// 5. Lấy n sinh viên điểm cao nhất
export function top(ds, n) {
    return ds.toSorted((a, b) =>
        b.score - a.score || soSanhTen(a.name, b.name)
    ).slice(0, Math.max(0, n));
}

// Hiển thị danh sách sinh viên
function renderStudents() {
    document.getElementById("studentList").innerHTML =
        ds.map(sv =>
            `<p>${sv.name} - ${sv.class} - ${sv.score} điểm</p>`
        ).join("");
}

// Thêm sinh viên
function addStudent() {
    const name = document.getElementById("name").value.trim();
    const className = document.getElementById("className").value.trim();
    const scoreInput = document.getElementById("score");
    const score = Number(scoreInput.value);

    if (!name || !className || scoreInput.value === "") {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (!Number.isFinite(score) || score < 0 || score > 10) {
        alert("Điểm phải từ 0 đến 10!");
        return;
    }

    ds.push({
        name: name,
        class: className,
        score: score
    });

    renderStudents();

    document.getElementById("name").value = "";
    document.getElementById("className").value = "";
    scoreInput.value = "";
}

// Bài 1: Hiển thị điểm trung bình
function showAverage() {
    document.getElementById("result1").textContent =
        "Điểm trung bình: " + diemTrungBinh(ds).toFixed(2);
}

// Bài 2: Hiển thị tên
function showNames() {
    document.getElementById("result2").textContent =
        layTen(ds).join(", ");
}

// Bài 3: Hiển thị xếp loại
function showClassification() {
    document.getElementById("result3").textContent =
        ds.map(sv =>
            `${sv.name}: ${sv.score} điểm - ${xepLoai(sv.score)}`
        ).join("\n");
}

// Bài 4: Nhóm theo lớp
function showGroups() {
    const nhom = nhomTheoLop(ds);

    document.getElementById("result4").textContent =
        Object.entries(nhom).map(([lop, sinhVien]) =>
            `${lop}:\n` +
            sinhVien.map(sv =>
                `- ${sv.name} (${sv.score} điểm)`
            ).join("\n")
        ).join("\n\n");
}

// Bài 5: Hiển thị top sinh viên
function showTop() {
    const n = Number(document.getElementById("topN").value);

    document.getElementById("result5").textContent =
        top(ds, n).map((sv, index) =>
            `${index + 1}. ${sv.name} - ${sv.score} điểm (${sv.class})`
        ).join("\n");
}

// Cho phép HTML gọi các hàm qua onclick
window.addStudent = addStudent;
window.showAverage = showAverage;
window.showNames = showNames;
window.showClassification = showClassification;
window.showGroups = showGroups;
window.showTop = showTop;

// Hiển thị danh sách khi mở trang
renderStudents();
