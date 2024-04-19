import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { db } from "../utils/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns";

interface BuildingVisitorChartProps {
    selectedBuilding: string;
}

const BuildingVisitorChart: React.FC<BuildingVisitorChartProps> = ({
    selectedBuilding,
}) => {
    const [visitorData, setVisitorData] = useState<{ [month: string]: number }>(
        {}
    );
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitorsCollection = collection(db, "visitorData2");
                const q = query(
                    visitorsCollection,
                    where("selectedBuilding", "==", selectedBuilding)
                );
                const querySnapshot = await getDocs(q);

                const data: { [key: string]: number } = {};

                querySnapshot.forEach((doc) => {
                    const visitor = doc.data();
                    const createdAt = visitor.createdAt.toDate();
                    const monthYear = format(createdAt, "MM-yyyy");
                    data[monthYear] = (data[monthYear] || 0) + 1;
                });

                // Sort the data by keys (month-year)
                const sortedData: { [key: string]: number } = Object.keys(data)
                    .sort()
                    .reduce((acc: { [key: string]: number }, key: string) => {
                        acc[key] = data[key];
                        return acc;
                    }, {});

                setVisitorData(sortedData);
            } catch (error) {
                console.error("Error fetching visitor data:", error);
            }
        };

        fetchData();
    }, [selectedBuilding]);

    // Convert month-year keys to month names
    const formattedVisitorData = Object.keys(visitorData).reduce(
        (acc: { [key: string]: number }, key: string) => {
            const [month, year] = key.split("-");
            const formattedMonthYear = `${format(
                new Date(parseInt(year), parseInt(month) - 1),
                "MMMM"
            )} ${year}`;
            acc[formattedMonthYear] = visitorData[key];
            return acc;
        },
        {}
    );

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy existing chart if it exists
        }

        // Render Line Chart
        const ctx = document.getElementById(
            "buildingVisitorChart"
        ) as HTMLCanvasElement;

        if (ctx) {
            const months = Object.keys(visitorData).map((key) => {
                const [month, year] = key.split("-");
                return `${format(
                    new Date(parseInt(year), parseInt(month) - 1),
                    "MMMM"
                )} ${year}`;
            });
            const counts = Object.values(visitorData);

            chartRef.current = new Chart(ctx, {
                type: "line",
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: `${selectedBuilding} Visitor Counts`,
                            data: counts,
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Number of Visitors",
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Month",
                            },
                        },
                    },
                },
            });
        }
    }, [visitorData, selectedBuilding]);

    return <canvas id="buildingVisitorChart" width="400" height="200"></canvas>;
};

export default BuildingVisitorChart;
