import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import {
  Paper,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
} from "@mui/material";
import "../../styles/Announcements.css";
import axios from "axios";
const Announcements = () => {
  const [data, setData] = useState([]);
  const keys = ["title", "description", "deadLine", "pdfName", "youtubeLink"];
  useEffect(() => {
    axios
      .get("http://localhost:4000/getAnnouncements")
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Latest Annoucements</h1>
    <div className="announcementsList">

      {data.map((announcement) => {
        return (
          <Card>
            <CardContent>
              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: 600 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableBody>
                    {
                      Object.entries(announcement).map(([key,value])=>{
                        if (keys.includes(key)) {
                          return (
                            <TableRow key={key}>
                              <TableCell>{key}</TableCell>
                              <TableCell>{value}</TableCell>
                            </TableRow>
                          );
                        }
                        return null
                      })
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        );
      })}
      <CardHeader />
    </div>
  </div>
  );
};

export default Announcements;
