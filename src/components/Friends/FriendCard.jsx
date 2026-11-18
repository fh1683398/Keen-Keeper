import React from 'react';
import { Link } from 'react-router';

const FriendCard = ({ friend }) => {

    const statusClass = {
        'on-track': 'bg-[#244D3F] text-white',
        'almost due': 'bg-[#EFAD44] text-white',
        'overdue': 'bg-[#EF4444] text-white'
    };

    return (
        <div >
            <Link to={`/friends/${friend.id}`} className='bg-white p-6 rounded-lg shadow-md flex flex-col items-center'>
                <img src={friend.picture} alt={friend.name} className='w-16 h-16 object-cover rounded-full mb-2' />
                <h3 className="text-xl font-semibold mb-2">{friend.name}</h3>
                <p className="text-[#64748B]">{friend.days_since_contact}d ago</p>
                <div className="mt-2 flex flex-wrap justify-center">
                    {
                        friend.tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-[#CBFADB] text-[#244D3F] text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{tag}</span>
                        ))
                    }
                </div>
                <div className="mt-2">
                    <span className={`text-xs ${statusClass[friend.status]} px-2 py-1 rounded-full`}>
                        {friend.status}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default FriendCard;