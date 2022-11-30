import { useEffect } from "react";
import { createRoutesFromElements } from "react-router-dom";
import "./Table.css";

function Table({data, remove, unsubscribe}) {
    // TODO: Get from database.
    //const data = [{productName:"Netflix", cost:25, date:"12/25/2001"},
    //{productName:"Netflix2", cost:256, date:"12/25/2002"}]

    if (Object.keys(data).length === 0) {
        return <h1>No subscriptions</h1>;
    }

    const col = Object.keys([data]);

    const titles = () => {
        return col.map((d) => {
            return <th key={d}>{d}</th>
        })
    }

    const products = () => {
        return data.map((d, key) => {
            return (<tr key={key}>
                { col.map((v) => {

                    return <td>{d[v]}</td>
                })
                }
            </tr>)
        })
    }

    return (
        <table className="table">
          <thead>
           <tr>
            <th>Name</th>
            <th>Cost</th>
            <th>Renewal Date</th>
            <th>Unsubscribe</th>
            <th>Remove</th>
           </tr>
          </thead>
          <tbody>
          {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.data().productName}</td>
              <td>${val.data().cost}</td>
              <td>{new Date((val.data().date)).toDateString()}</td>
              <td><button className="unsubButton" onClick={unsubscribe}>↓</button></td>
              <td><button className="removeProduct" onClick={remove}>X</button></td>
            </tr>
          )
        })}
          </tbody>
         </table>
    )
}
export default Table;