import { useEffect, useState } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Typography,
    CircularProgress,
    Box
} from "@mui/material";
import { getAlerts } from "../api/getAlerts";

const DisplayAlerts = () => {
    const [fetchAlerts, setFetchAlerts] = useState([]);
    const [loading, setLoading] = useState(true)

    const severityTags = {
        Low: { color: '#c3e6cb', label: "Low", textColor: '#155724' },
        Medium: { color: '#ffeeba', label: "Medium", textColor: '#856404' },
        High: { color: '#f5c6cb', label: "High", textColor: '#721c24' },
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const result = await getAlerts();
                setFetchAlerts(result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getData();

    }, [fetchAlerts])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 'lg', margin: 'auto', marginTop: 3 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Message</Typography></TableCell>
                            <TableCell><Typography variant="h6">Severity</Typography></TableCell>
                            <TableCell><Typography variant="h6">Time</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchAlerts.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell>{row.message}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={severityTags[row.severity]?.label || 'Unknown'}
                                        sx={{
                                            bgcolor: severityTags[row.severity]?.color || '#e9ecef',
                                            color: severityTags[row.severity]?.textColor || '#212529',
                                            fontWeight: 'bold',
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};

export default DisplayAlerts;