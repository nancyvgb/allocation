export default function buildTable(json){
    function json2Table(json) {
        let cols = Object.keys(json[0]);
        //Map over columns, make headers,join into string
        let headerRow = cols
            .map(col => `<th> ${col.toUpperCase()}</th>`)
            .join("");
        //map over array of json objs,
        //and return a td with the value of that object for its column
        let rows = json
            .map(row => {
                let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                return `<tr>${tds}</tr>`;
            })
            .join("");
        //build the table
        const table = `
    <table>
        <thead>
            <tr>${headerRow}</tr>
        <thead>
        <tbody>
            ${rows}
        <tbody>
    <table>`;
        return table;
    }
    
    let output = document.getElementById('output')
    output.innerHTML = json2Table(json)
}
