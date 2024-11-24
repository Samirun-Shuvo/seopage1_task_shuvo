case "status":
    return (
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
    );
case "dealStatus":
    return (
        <td className="px-4 py-2 truncate">
            {item.deal_status !== 0 ? (
                <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-sm">
                    No Activity Yet
                </span>
            ) : (
                <span className="text-gray-500 text-sm">Not Applicable</span>
            )}
        </td>
    );