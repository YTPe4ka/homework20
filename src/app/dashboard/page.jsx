'use client';
import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '@/utils/api';
import './page.css';
import { Token } from '@mui/icons-material';
import profile from '../createprofile/page';
import { usePathname, useRouter } from 'next/navigation';

function Dashboard() {
  const route = useRouter();
  const { me } = useParams();
  const [AboutMe, setAboutMe] = useState(null);
  const [social, setsocial] = useState(null);
  const [skills, setskills] = useState([]);
  const [status, setstatus] = useState('');
  const [isbio, setIsPending] = useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    (async function () {
      try {
        let response = await axios.get(`${baseUrl}/profile/me`, {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        });

        if (response.status === 400) {
          route.push("/createprofile");
        }
        console.log("Me LOG BRO NAH I'D WIN :>", response);
        let resme = response.data;
        if (resme && response.status === 200) {
          setAboutMe(resme);
          setsocial(resme.social || {});
          setskills(resme.skills || []);
          setstatus(resme.status || '');
        } else {
          console.log('me not found for ID:', me);
          route.push("/createprofile");
        }
      } catch (error) {
        console.log('Error fetching me', error);
        route.push("/createprofile");
          
      }
    })();
  }, []);
  // if (status === "") {
    //   <link rel="stylesheet" href="/createprofile" />
    // }
    console.log(
      social,'social',skills,'skills',status,'status','biiiiiiiiiiiiiiiiiiiiiiiiiiiiiig',me,
    );
  return (
    <div className="Main">
      <h1>Dashboard</h1>
      <h2>
        Welcome <span className="name">{AboutMe?.user?.name}</span>
      </h2>
      <button className="bg-sky-500 hover:bg-sky-700  ">
        <a href="/edit-profile" >edit profile</a>
      </button>
    </div>
  );
}

export default Dashboard;
