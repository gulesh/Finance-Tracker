import React from "react";
import { useCategoryQueries } from '../../queries/categoryQueries';
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const CategoryBarChart = () => {
    const { useGetCategoriesQuery } = useCategoryQueries();
     const { data: categories } = useGetCategoriesQuery();


    const categoriesData = {
        labels: categories?.map((category) => category.name) ?? [],
        datasets: [
        {
            label: "Amount Spent",
            data: categories?.map((category) => category.amountSpent) ?? [],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
        },
        {
            label: "Amount Remaining",
            data:
            categories?.map(
                (category) => category.amountAllocated - category.amountSpent
            ) ?? [],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
        },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
            position: "top",
            },
            title: {
            display: true,
            text: "Categories",
            },
        },
        scales: {
            x: {
            stacked: true,
            },
            y: {
            stacked: true,
            },
        },
    };

    return(
        <Bar
            key="categoryBarChart"
            data={categoriesData}
            options={options}
        />
    );

}

export default CategoryBarChart;