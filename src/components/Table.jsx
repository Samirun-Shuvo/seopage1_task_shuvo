import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

const Table = ({ data }) => {
    const itemsPerPage = 25;
    const [currentPage, setCurrentPage] = useState(1);

    // Dynamic column state
    const [columns, setColumns] = useState([
        { key: "#", label: "#", visible: true },
        { key: "name", label: "Name", visible: true },
        { key: "projectLink", label: "Project Link", visible: true },
        { key: "projectId", label: "Project ID", visible: true },
        { key: "projectBudget", label: "Project Budget", visible: true },
        { key: "bidValue", label: "Bid Value", visible: true },
        { key: "created", label: "Created", visible: true },
        { key: "createdBy", label: "Created By", visible: true },
        { key: "biddingDelayTime", label: "Bidding Delay Time", visible: true },
        { key: "status", label: "Status", visible: true },
        { key: "dealStatus", label: "Deal Status", visible: true },
        { key: "action", label: "Action", visible: true },
    ]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Drag-and-drop handlers
    const onDragStart = (index) => (event) => {
        event.dataTransfer.setData("draggedIndex", index);
    };

    const onDrop = (targetIndex) => (event) => {
        const draggedIndex = event.dataTransfer.getData("draggedIndex");
        const updatedColumns = [...columns];
        const [draggedColumn] = updatedColumns.splice(draggedIndex, 1);
        updatedColumns.splice(targetIndex, 0, draggedColumn);
        setColumns(updatedColumns);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    // Toggle column visibility
    const toggleColumnVisibility = (key) => {
        setColumns((prev) =>
            prev.map((column) =>
                column.key === key ? { ...column, visible: !column.visible } : column
            )
        );
    };

    return (
        <>
            {/* Settings Dropdown */}
            <div className="flex justify-end items-center m-6 cursor-pointer relative z-50">
                <div className="dropdown relative">
                    <button className="btn btn-xs">
                        <IoIosSettings className="fs-4" />
                    </button>
                    <div className="dropdown-content absolute z-50 bg-white shadow-lg rounded-md p-2 w-48 right-8 top-0 mt-2">
                        {columns.map((column) => (
                            <label key={column.key} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={column.visible}
                                    onChange={() => toggleColumnVisibility(column.key)}
                                />
                                <span>{column.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table */}
            <table className="table table-xs">
                <thead>
                    <tr>
                        {columns.map(
                            (column, index) =>
                                column.visible && (
                                    <th
                                        key={column.key}
                                        draggable
                                        onDragStart={onDragStart(index)}
                                        onDragOver={onDragOver}
                                        onDrop={onDrop(index)}
                                        className="cursor-move text-center font-semibold bg-gray-100"
                                    >
                                        {column.label}
                                    </th>
                                )
                        )}
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {paginatedData.map((item, rowIndex) => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {columns.map(
                                (column) =>
                                    column.visible && (
                                        <td key={column.key}>
                                            {column.key === "#"
                                                ? startIndex + rowIndex + 1
                                                : column.key === "name" ? (
                                                    item.client_name
                                                ) : column.key === "projectLink" ? (
                                                    <a
                                                        href={item.project_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        View Project
                                                    </a>
                                                ) : column.key === "projectId" ? (
                                                    item.project_id || "N/A"
                                                ) : column.key === "projectBudget" ? (
                                                    item.value || "N/A"
                                                ) : column.key === "bidValue" ? (
                                                    item.bid_value || "N/A"
                                                ) : column.key === "created" ? (
                                                    new Date(item.created_at).toLocaleString()
                                                ) : column.key === "createdBy" ? (
                                                    item.added_by || "N/A"
                                                ) : column.key === "biddingDelayTime" ? (
                                                    `${item.bidding_minutes || 0}m ${item.bidding_seconds || 0}s`
                                                ) : column.key === "status" ? (
                                                    <td className="px-4 py-2 truncate">
                                                        {item.deal_status !== 0 ? (
                                                            <span className="bg-green-500 text-white rounded-full px-2 py-1 text-sm">
                                                                Converted to Deal
                                                            </span>
                                                        ) : (
                                                            <span className="bg-red-500 text-white rounded-full px-2 py-1 text-sm">
                                                                Not Converted to Deal
                                                            </span>
                                                        )}
                                                    </td>
                                                ) : column.key === "dealStatus" ? (
                                                    <td className="px-4 py-2 truncate">
                                                        {item.deal_status !== 0 ? (
                                                            <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-sm">
                                                                No Activity Yet
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-500 text-sm">Not Applicable</span>
                                                        )}
                                                    </td>
                                                ) : column.key === "action" ? (
                                                    <BsThreeDotsVertical />
                                                ) : item[column.key] || "N/A"}
                                        </td>
                                    )
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end m-6">
                <div className="btn-group">
                    <button
                        className="btn btn-xs"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`btn ${currentPage === index + 1 ? "btn-active" : ""
                                } mx-2 btn-xs`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-xs"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Table;
