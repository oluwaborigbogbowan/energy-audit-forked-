import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Priority = ({ audits, myProduct, total, myPower }) => {
  let device = myProduct.find(
    (device) => total <= device.battery && myPower <= device.inverter,
  );
  console.log(device);

  return (
    // <table>
    //   <thead>
    //     <tr>
    //       <td>Power consumed</td>
    //       <td>Energy consumed</td>
    //       <td>Recommended product</td>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td>{myPower}</td>
    //       <td>{total}</td>
    //       <td>{device.name}</td>
    //     </tr>
    //   </tbody>
    // </table>
    <div className="priority">
      <div className="container">
        {device ? (
          total ? (
            <Card sx={{ minWidth: "auto" }}>
              <CardMedia
                component="img"
                height="194"
                image={device.picture}
                alt="cube"
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {device.name}
                </Typography>
                <Typography variant="h6">
                  <b>Specification</b>:<br />
                  Inverter:{device.inverter}(W)
                  <br />
                  battery:{device.battery}(W/hr)
                </Typography>
                <Typography variant="h6">
                  <b>Price:</b> &#x20A6;{device.price}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <p>No recommendation </p>
          )
        ) : (
          <p>
            We do not have a product for your consumpution, pls contatct us to
            get a customized device.
          </p>
        )}
      </div>
    </div>
  );
};

export default Priority;
