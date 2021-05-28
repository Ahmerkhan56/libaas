import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteSpamIps, GetSpamIps } from '../api/spamApi';
import MessageBox from '../components/MessageBox';
import Swal from 'sweetalert2'

export default function SpamReviewScreen(props) {
    const [ipList, setIpList] = useState({})

    useEffect(async () => {
        setIpList((await GetSpamIps(props.match.params.id)).data)
    }, [])
    const deleteSpam=async (ipaddress)=>
    {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.isConfirmed) {
                await DeleteSpamIps(props.match.params.id,ipaddress)
              window.location.reload();  
          }
          })

        
    }
    return (<div>
        <div>
            <Link to="/productlist">Back to result</Link>
            <div>
                <h2 id="reviews">Spam Reviews</h2>

                {Object.keys(ipList).length === 0 && (
                    <MessageBox>There is no review</MessageBox>
                )}
                {Object.keys(ipList).length !== 0 && (
                    <div className="spam">
                        {
                            Object.keys(ipList).map(item => {
                                return (
                                    <div className="spam-container">
                                        <div>
                                            <h4>{item}</h4>
                                        </div>
                                        <table  className="table">
                                        <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>RATING</th>
                                        <th>DATE</th>
                                        <th>COMMENT</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {ipList[item].map((items,i) => {
                                                return <tr>
                                                    <td>{i+1}</td>
                                                    <td>{items.name}</td>
                                                    <td>{items.rating}</td>
                                                    <td> {items.createdAt.substring(0, 10)}</td>
                                                    <td> {items.comment}</td>
                                                    </tr>
                                            })}
                                            </tbody>
                                            </table>
                                            <div className="btn-container1">
                                                <button   onClick={()=>deleteSpam(item)} className="danger">Delete</button>
                                            </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </div>
        </div>
    </div>)
}
