import { UserCircleIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { _getUser, _updateUser } from '../../api/index';
import { User } from '../../interface';
import DatePicker from '../../components/datepicker';
import Dialog from '../../components/dialog';

const EditUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const userId = Number(queryParams.get('id') || '');
  const [userInfo, setUserInfo] = useState({} as User);

  const getUser = async (id: number) => {
    try {
      let res = (await _getUser(id)) as User;
      if (res) {
        setUserInfo({
          avater: res.avater,
          firstName: res.firstName,
          lastName: res.lastName,
          phone: res.phone,
          email: res.email,
          gender: res.gender,
          location: res.location,
          birthDate: res.birthDate,
          desc: res.desc || '',
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  useEffect(() => {
    getUser(userId);
  }, []);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (userInfo.avater) {
      setPreviewUrl(userInfo.avater);
    }
  }, [userInfo]);
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (!['image/jpeg', 'image/gif', 'image/png'].includes(fileType)) {
        alert('Please select a JPEG, GIF, or PNG file.');
        return;
      }
      const fileSize = selectedFile.size;
      const maxSize = 1024 * 1024;
      if (fileSize > maxSize) {
        alert('File size exceeds 1MB limit.');
        return;
      }
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      const formData = new FormData();
      formData.append('file', selectedFile);
      try {
        const res = await axios.post(`/api/user/upload?id=${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (res && res.data && res.data.data && res.data.data.url) {
          setUserInfo({
            ...userInfo,
            avater: res.data.data.url,
          });
        }
        console.log('File uploaded successfully:', res.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };
  const handleUpload = () => {
    fileInputRef?.current?.click();
  };
  const onCancel = () => {
    setTimeout(()=>{
      navigate(-1);
    },200)
    // navigate(-1);
  };
  const onConfirm = async () => {
    try {
      await _updateUser(userId, userInfo);
      setOpenDialog(false)
      setTimeout(()=>{
        navigate(-1);
      },200)
    } catch (err) {
      console.log('err', err);
    }
  };
  const onSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    setOpenDialog(true)
    e.preventDefault()

  }
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let name = e.target.name;
    let value: string | number = e.target.value;
    if (name === 'gender') {
      value = Number(value);
    }
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const handleDateChange = (newValue: string) => {
    setUserInfo({
      ...userInfo,
      birthDate: newValue,
    });
  };

  return (
    <div className="flex flex-col h-full overflow-auto">
      <Dialog value={openDialog} onConfirm={onConfirm} onCancel={()=>{
        setOpenDialog(false)
      }}></Dialog>
      <div className="mx-auto max-w-7xl  sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={onSubmit}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="avater" className="block text-sm font-medium leading-6 text-gray-900">
                      Avater
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {previewUrl ? (
                        <img src={previewUrl} className="h-20 w-20 rounded-full" alt="Preview" />
                      ) : (
                        <UserCircleIcon className="h-20 w-20 text-gray-300" aria-hidden="true" />
                      )}
                      <div className="flex flex-col text-xs">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.gif,.png"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          hidden
                        />
                        <button
                          type="button"
                          onClick={handleUpload}
                          className="mb-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          Change avater
                        </button>
                        <span>JPG, GIF or PNG. 1MB max.</span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                      First name
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="text"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        placeholder="firstName"
                        name="firstName"
                        id="firstName"
                        autoComplete="family-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                      Last name
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="given-name"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        placeholder="lastName"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="phone"
                        pattern="^(?:(?:\+|00)86)?1[3-9]\d{9}$"
                        title="Please enter a valid phone number"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        value={userInfo.phone}
                        onChange={handleChange}
                        placeholder="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder="email"
                        title="Please enter a valid email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                      Gender
                    </label>
                    <div className="mt-2">
                      <select
                        id="gender"
                        name="gender"
                        value={userInfo.gender}
                        onChange={handleChange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option value="">请选择</option>
                        <option value={1}>Female</option>
                        <option value={2}>Male</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                      Location
                    </label>
                    <div className="mt-2">
                      <input
                        required
                        type="text"
                        name="location"
                        id="location"
                        value={userInfo.location}
                        onChange={handleChange}
                        placeholder="location"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="birthDate" className="block text-sm font-medium leading-6 text-gray-900">
                      BirthDate
                    </label>
                    <div className="mt-2">
                      <DatePicker value={userInfo.birthDate} onChange={handleDateChange}></DatePicker>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label htmlFor="desc" className="block text-sm font-medium leading-6 text-gray-900">
                      Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="desc"
                        id="desc"
                        rows={4}
                        value={userInfo.desc}
                        onChange={handleChange}
                        placeholder="description"
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={onCancel}>
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditUser;
