import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

const Table = ({ data }) => {
    // Pagination State
    const itemsPerPage = 25; // Change this to control how many items per page
    const [currentPage, setCurrentPage] = useState(1);

    // Column visibility state
    const [visibleColumns, setVisibleColumns] = useState({
        name: true,
        projectLink: true,
        projectId: true,
        projectBudget: true,
        bidValue: true,
        created: true,
        createdBy: true,
        biddingDelayTime: true,
        status: true,
        dealStatus: true,
        action: true,
    });

    // Calculate the start and end index for slicing the data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data for the current page
    const paginatedData = data.slice(startIndex, endIndex);

    // Total pages calculation
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Toggle column visibility
    const toggleColumnVisibility = (column) => {
        setVisibleColumns((prevState) => ({
            ...prevState,
            [column]: !prevState[column],
        }));
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
                        {Object.keys(visibleColumns).map((column) => (
                            <label key={column} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={visibleColumns[column]}
                                    onChange={() => toggleColumnVisibility(column)}
                                />
                                <span>{column.replace(/([A-Z])/g, ' $1').toUpperCase()}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>


            {/* Table */}
            <table className="table table-xs">
                <thead>
                    <tr>
                        {visibleColumns.name && <th>#</th>}
                        {visibleColumns.name && <th>Name</th>}
                        {visibleColumns.projectLink && <th>Project Link</th>}
                        {visibleColumns.projectId && <th>Project Id</th>}
                        {visibleColumns.projectBudget && <th>Project Budget</th>}
                        {visibleColumns.bidValue && <th>Bid Value</th>}
                        {visibleColumns.created && <th>Created</th>}
                        {visibleColumns.createdBy && <th>Created By</th>}
                        {visibleColumns.biddingDelayTime && <th>Bidding Delay Time</th>}
                        {visibleColumns.status && <th>Status</th>}
                        {visibleColumns.dealStatus && <th>Deal Status</th>}
                        {visibleColumns.action && <th>Action</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {paginatedData.map((item, index) => (
                        <tr
                            key={item.id}
                            className="hover:bg-gray-50 transition duration-200"
                        >
                            {visibleColumns.name && <td>{startIndex + index + 1}</td>}
                            {visibleColumns.name && <td>{item.client_name || "N/A"}</td>}
                            {visibleColumns.projectLink && (
                                <td>
                                    <a
                                        href={item.project_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Project
                                    </a>
                                </td>
                            )}
                            {visibleColumns.projectId && <td>{item.project_id || "N/A"}</td>}
                            {visibleColumns.projectBudget && <td>{item.value || "N/A"}</td>}
                            {visibleColumns.bidValue && <td>{item.bid_value || "N/A"}</td>}
                            {visibleColumns.created && <td>{new Date(item.created_at).toLocaleString()}</td>}
                            {visibleColumns.createdBy && <td>{item.added_by || "N/A"}</td>}
                            {visibleColumns.biddingDelayTime && (
                                <td>
                                    {item.bidding_minutes || 0}m {item.bidding_seconds || 0}s
                                </td>
                            )}
                            {visibleColumns.status && (
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
                            )}
                            {visibleColumns.dealStatus && (
                                <td className="px-4 py-2 truncate">
                                    {item.deal_status !== 0 ? (
                                        <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-sm">
                                            No Activity Yet
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 text-sm">Not Applicable</span>
                                    )}
                                </td>
                            )}
                            {visibleColumns.action && (
                                <td>
                                    <BsThreeDotsVertical />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-end m-6">
                <div className="btn-group">
                    {/* Previous Button */}
                    <button
                        className="btn btn-xs"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`btn ${currentPage === index + 1 ? "btn-active" : ""} mx-2 btn-xs`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Button */}
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
