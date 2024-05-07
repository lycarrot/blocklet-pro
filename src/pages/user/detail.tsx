import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { _getUser } from '../../api/index';
//@ts-ignore
import defaultImg from '../../../public/default.jpeg';
import { useLocation } from 'react-router-dom';
import { User } from '../../interface';

const UserDetail: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = Number(queryParams.get('id') || '');
  const [userInfo, setUserInfo] = useState({} as User);
  const getUser = async (id: number) => {
    try {
      let res = (await _getUser(id)) as User;
      if (res) {
        setUserInfo({
          avater: `${res.avater}` || defaultImg,
          name: res.firstName + '_' + res.lastName,
          phone: res.phone,
          email: res.email,
          gender: res.gender === 1 ? 'Female' : 'Male',
          location: res.location,
          birthDate: res.birthDate,
          description: res.desc,
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    getUser(userId);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow  overflow-scroll">
        <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div>
              <div className="mt-6">
                <dl className="divide-y divide-gray-100">
                  {Object.keys(userInfo).map((key: string, idx: number) => {
                    if (key == 'avater') {
                      return (
                        <div className="px-4 pb-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={idx}>
                          <dt className="text-sm font-medium leading-6 text-gray-900">{key.toLocaleUpperCase()}</dt>
                          <div className="sm:col-span-2 flex items-center">
                            <img src={userInfo[key]} alt="" className="w-20 h-20 rounded-full" />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={idx}>
                          <dt className="text-sm font-medium leading-6 text-gray-900">{key.toLocaleUpperCase()}</dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {userInfo[key as keyof User] || '-'}
                          </dd>
                        </div>
                      );
                    }
                  })}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-5">
        <Link to={`/user/edit?id=${userId}`}>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};
export default UserDetail;
