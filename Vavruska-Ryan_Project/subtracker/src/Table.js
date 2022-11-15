import { useEffect } from "react";
import { createRoutesFromElements } from "react-router-dom";

function Table() {
    // TODO: Get from database.
    const data = [{productName:"Netflix", cost:25, date:"12/25/2001"},
    {productName:"Netflix", cost:25, date:"12/25/2001"}]

    const col = Object.keys([data]);

    const titles = () => {
        return col.map((d) => {
            return <th key={d}>{d}</th>
        })
    }

    const products = () => {
        return data.map((d) => {
            return (<tr>
                { col.map((v) => {
                    return <td>{d[v]}</td>
                })}
            </tr>)
        })
    }

    return (
        <table className="table">
          <thead>
           <tr>{titles()}</tr>
          </thead>
          <tbody>
          {products()}
          </tbody>
         </table>
    )
}
export default Table;