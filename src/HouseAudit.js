import { useEffect, useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const HouseAudit = ({
  audits,
  setAudits,
  total,
  setTotal,
  myPower,
  setMyPower,
}) => {
  const [auditEquipment, setAuditEquipment] = useState("");
  const [auditRating, setAuditRating] = useState("");
  const [auditHours, setAuditHours] = useState("");
  const [auditQuantity, setAuditQuantity] = useState("");
  const [auditTotalPower, setAuditTotalPower] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = audits.length ? audits[audits.length - 1].id + 1 : 1;
    const newAudit = {
      id,
      equipment: auditEquipment,
      rating: auditRating,
      quantity: auditQuantity,
      totalPower: auditTotalPower,
      dailyUsage: auditHours,
      dailyEnergy: total,
    };
    const allAudit = [...audits, newAudit];
    setAudits(allAudit);
    setAuditEquipment("");
    setAuditHours("");
    setAuditRating("");
    setAuditQuantity("");
  };
  let sum = 0;
  let equ = 0;

  useEffect(() => {
    const handleAudit = () => {
      const eachAudit = audits.map(
        (audit) => audit.rating * audit.dailyUsage * audit.quantity,
      );
      let add = 0;
      for (let i = 0; i < eachAudit.length; i++) {
        add += eachAudit[i];
      }
      sum = add;
      setTotal(sum);

      const eachpower = audits.map((audit) => audit.rating * audit.quantity);
      let num = 0;
      for (let i = 0; i < eachpower.length; i++) {
        num += eachpower[i];
      }
      equ = num;
      setMyPower(equ);
    };

    handleAudit();
  }, [audits]);

  const handleHour = (e) => {
    setAuditHours(e.target.value);
    setAuditTotalPower(auditRating * auditQuantity);
  };
  const handleDelete = (id) => {
    const newList = audits.filter((audit) => audit.id !== id);
    setAudits(newList);
  };

  function createData(
    id,
    equipment,
    rating,
    quantity,
    totalPower,
    dailyUsage,
    dailyEnergy,
  ) {
    return {
      id,
      equipment,
      rating,
      quantity,
      totalPower,
      dailyUsage,
      dailyEnergy,
    };
  }

  const rows = audits.map((audit) =>
    createData(
      audit.id,
      audit.equipment,
      audit.rating,
      audit.quantity,
      audit.totalPower,
      audit.dailyUsage,
      audit.equipment ? audit.rating * audit.quantity * audit.dailyUsage : "",
    ),
  );

  return (
    <div className="houseAudit">
      <div className="container">
        <form className="inputs" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Equipment"
            value={auditEquipment}
            required
            onChange={(e) => setAuditEquipment(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating(Watt)"
            value={auditRating}
            required
            onChange={(e) => setAuditRating(e.target.value)}
            min="1"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={auditQuantity}
            required
            onChange={(e) => setAuditQuantity(e.target.value)}
            min="1"
          />
          <input
            type="number"
            placeholder="Daily Usage(Hour)"
            value={auditHours}
            required
            onChange={handleHour}
            min="1"
            max="24"
          />

          <Fab
            type="submit"
            style={{
              backgroundColor: "#0c6525",
              color: "white",
            }}
            size="small"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </form>
        {/* <table>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Rating</th>
              <th>Quantity</th>
              <th>Total Power</th>
              <th>Daily Usage</th>
              <th>Daily Energy</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((audit) => (
              <tr>
                <td>{audit.equipment}</td>
                <td>{audit.rating}</td>
                <td>{audit.quantity}</td>
                <td>{audit.totalPower}</td>
                <td>{audit.dailyUsage}</td>
                <td>
                  {audit.equipment
                    ? audit.rating * audit.quantity * audit.dailyUsage
                    : ""}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>{`Total power: ${myPower} VA`}</td>
              <td
                colSpan={4}
              >{`Your daily energy consumpution is: ${total}Wh`}</td>
            </tr>
          </tbody>
        </table> */}

        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <Table sx={{ minWidth: "auto" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Equipment</b>
                </TableCell>
                <TableCell align="right">
                  <b>Rating(W)</b>
                </TableCell>
                <TableCell align="right">
                  <b>Quantity</b>
                </TableCell>
                <TableCell align="right">
                  <b>Total Power(W)</b>
                </TableCell>
                <TableCell align="right">
                  <b>Daily Usage(hr)</b>
                </TableCell>
                <TableCell align="right">
                  <b>Daily Energy(W/hr)</b>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.equipment}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.equipment}
                  </TableCell>
                  <TableCell align="center">{row.rating}</TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">{row.totalPower}</TableCell>
                  <TableCell align="center">{row.dailyUsage}</TableCell>
                  <TableCell align="center">{row.dailyEnergy}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      align="center"
                      size="large"
                      aria-label="delete"
                      onClick={() => handleDelete(row.id)}
                    >
                      <DeleteIcon style={{ color: "#d62828" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}>{`Total power: ${myPower} W`}</TableCell>
                <TableCell
                  align="center"
                  colSpan={4}
                >{`Your daily energy consumpution is: ${total}Wh`}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <button  onClick={handleAudit} >Audit</button> */}
      </div>
    </div>
  );
};

export default HouseAudit;
