'use client';
import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Token } from '@mui/icons-material';

function createprofile() {
  const route = useRouter();


  const onSubmits = async (e) => {
    e.preventDefault();
    let status = e.target[0].value ;
    let company = e.target[1].value;
    let website = e.target[2].value || undefined;
    let Location = e.target[3].value;
    let skills= e.target[4].value;
    let githubusername = e.target[5].value;
    let bio = e.target[6].value;
    console.log(status, company, website, githubusername, bio);
    
    try {
      let res = await axios.post(`${baseUrl}/profile`, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
        status,
        company,
        website,
        location,
        skills,
        githubusername,
        bio,

      },{
      
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        }});
      console.log(status, company, website, location,skills,githubusername, bio,"sssssssssssssssssssssssssssssssssssssssssss");
      if (res.status === 200) {
        route.push('/dashboard');
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-col gap-3 items-center'>
      <h1 className='text-4xl'>Create Your Profile</h1>
      <h2 className='text-2xl'>Let's get some information to make your</h2>
      <p className='text-sm'>* = required field</p>
      <form
        action=""
        onSubmit={onSubmits}
        className="flex flex-col gap-3 items-center"
      >
        <select id="person" name="person">
          <option value="* Select Professional Status">* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="manager">manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructur or Teacher">Instructur or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="other">other</option>
        </select>
        <p className='opacity-50'>Give us an idea of where you are at in your career</p>
        <input type="text" placeholder="Company" name='company' />
        <p className='opacity-50'>Could be your own company or one you work for</p>
        <input type="text " placeholder="Website" name='website' />
        <p className='opacity-50'>Could be your own or a company website</p>
        <input type="text " placeholder="Location" name='location'/>
        <p className='opacity-50'>City & state suggested {`(eg. Boston, MA)`}</p>
        <input type="text " placeholder="*Skills" name='skills'/>
        <p className='opacity-50'>Please use comma separated values {`(eg. HTML,CSS,JavaScript,PHP)`}</p>
        <input type="text " placeholder="GitHub Username" name='githubusername'/>
        <p className='opacity-50'>If you want your latest repos and a Github link, include your username</p>
        <textarea rows="5" cols="30" placeholder="Write A short bio about ur self" name='bio'></textarea>
        <p className='opacity-50'>Tell us a little about yourself</p>
        <button>add social network links</button>
        <input type="text " placeholder="Twitter URl" />
        <input type="text " placeholder="Facebook URl" />
        <input type="text " placeholder="YouTube URl" />
        <input type="text " placeholder="Linkedin URl" />
        <input type="text " placeholder="Instagram URl" />




        <button type="submit" >submit</button>
      </form>
    </div>
  );
}

export default createprofile;
