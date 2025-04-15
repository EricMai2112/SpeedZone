import React, { useEffect, useRef, useState } from 'react'
import vf9 from '../../assets/images/vf91.png'
import Footer from '../Footer'
import { useNavigate } from 'react-router-dom'
import FormRegister from './FormRegister'

export default function Product() {
  const apiCar = 'https://67e227a797fc65f53534c8a2.mockapi.io/apiTodo/cars'
  const navigate = useNavigate()
  const formRef = useRef(null)
  const contactRef = useRef(null)

  const [dataCar, setDataCar] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [currentCar, setCurrentCar] = useState(null)
  const [newCar, setNewCar] = useState({
    name: '',
    price: '',
    image: [''],
    type: '',
    description: '',
    availability: false,
    top_speed: '',
    charging_time: '',
    color: [{ name: '', value: '', image: '' }],
    length: '',
    width: '',
    height: '',
    seating_capacity: '',
    battery_capacity: '',
    airbag: '',
    technology: [],
    standard_charge_time: '',
    fast_charge_time: ''
  })

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true'
    setIsAdmin(adminStatus)

    fetch(apiCar)
      .then((res) => {
        return res.json()
      })
      .then((data) => setDataCar(data))
  }, [])

  // Handle Add Car
  const handleAddCar = () => {
    fetch(apiCar, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    })
      .then((res) => res.json())
      .then((data) => {
        setDataCar([...dataCar, data])
        setShowAddForm(false)
        setNewCar({
          name: '',
          price: '',
          image: [''],
          type: '',
          description: '',
          availability: false,
          top_speed: '',
          charging_time: '',
          color: [{ name: '', value: '', image: '' }],
          length: '',
          width: '',
          height: '',
          seating_capacity: '',
          battery_capacity: '',
          airbag: '',
          technology: [],
          standard_charge_time: '',
          fast_charge_time: ''
        })
      })
  }

  // Handle Edit Car
  const handleEditCar = (item) => {
    setCurrentCar(item)
    setShowEditForm(true)
  }

  const handleUpdateCar = () => {
    fetch(`${apiCar}/${currentCar.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(currentCar)
    })
      .then((res) => res.json())
      .then((data) => {
        setDataCar(dataCar.map((car) => (car.id === data.id ? data : car)))
        setShowEditForm(false)
        setCurrentCar(null)
      })
  }

  // Handle Delete Car
  const handleDeleteCar = (id) => {
    fetch(`${apiCar}/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setDataCar(dataCar.filter((car) => car.id !== id))
    })
  }

  // Handle Add Color for New Car
  const handleAddColor = () => {
    setNewCar({
      ...newCar,
      color: [...newCar.color, { name: '', value: '', image: '' }]
    })
  }

  // Handle Add Color for Edit Car
  const handleAddColorEdit = () => {
    setCurrentCar({
      ...currentCar,
      color: [...currentCar.color, { name: '', value: '', image: '' }]
    })
  }

  const handleClick = (item) => {
    console.log(item)
    navigate(`/product/${item.id}`, { state: { product: item } })
  }

  const handleScrollToRegister = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='mt-36 flex flex-col items-center justify-center'>
      <div className='w-11/12'>
        <h1 className='text-center font-medium text-4xl bg-[#ebebeb] p-2 rounded-lg'>
          CÁC DÒNG XE VINFAST TẠI SPEEDZONE
        </h1>
      </div>

      {/* Add Car Button for Admin */}
      {isAdmin && (
        <div className='w-11/12 mt-4 text-right'>
          <button
            onClick={() => setShowAddForm(true)}
            className='bg-green-500 text-white font-medium px-4 py-2 rounded hover:bg-green-600'
          >
            Thêm xe
          </button>
        </div>
      )}

      {/* Add Car Form */}
      {showAddForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto'>
          <div className='bg-white p-6 rounded-lg w-full max-w-4xl my-8'>
            <h3 className='text-xl font-bold mb-4'>Thêm xe mới</h3>
            <div className='flex flex-wrap gap-4'>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='text'
                  placeholder='Tên xe'
                  value={newCar.name}
                  onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='text'
                  placeholder='Giá (VND)'
                  value={newCar.price}
                  onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='text'
                  placeholder='URL hình ảnh chính'
                  value={newCar.image[0]}
                  onChange={(e) => setNewCar({ ...newCar, image: [e.target.value] })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='text'
                  placeholder='Loại xe'
                  value={newCar.type}
                  onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <textarea
                  placeholder='Mô tả'
                  value={newCar.description}
                  onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex items-center'>
                <label className='mr-2'>Có sẵn:</label>
                <input
                  type='checkbox'
                  checked={newCar.availability}
                  onChange={(e) => setNewCar({ ...newCar, availability: e.target.checked })}
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Tốc độ tối đa (km/h)'
                  value={newCar.top_speed}
                  onChange={(e) => setNewCar({ ...newCar, top_speed: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Thời gian sạc (phút)'
                  value={newCar.charging_time}
                  onChange={(e) => setNewCar({ ...newCar, charging_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Chiều dài (cm)'
                  value={newCar.length}
                  onChange={(e) => setNewCar({ ...newCar, length: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Chiều rộng (cm)'
                  value={newCar.width}
                  onChange={(e) => setNewCar({ ...newCar, width: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Chiều cao (cm)'
                  value={newCar.height}
                  onChange={(e) => setNewCar({ ...newCar, height: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Số chỗ ngồi'
                  value={newCar.seating_capacity}
                  onChange={(e) => setNewCar({ ...newCar, seating_capacity: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Dung lượng pin (kWh)'
                  value={newCar.battery_capacity}
                  onChange={(e) => setNewCar({ ...newCar, battery_capacity: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Số túi khí'
                  value={newCar.airbag}
                  onChange={(e) => setNewCar({ ...newCar, airbag: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Thời gian sạc chuẩn (phút)'
                  value={newCar.standard_charge_time}
                  onChange={(e) => setNewCar({ ...newCar, standard_charge_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px]'>
                <input
                  type='number'
                  placeholder='Thời gian sạc nhanh (phút)'
                  value={newCar.fast_charge_time}
                  onChange={(e) => setNewCar({ ...newCar, fast_charge_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
            </div>

            <div className='mt-4'>
              <h4 className='font-bold'>Màu sắc</h4>
              {newCar.color.map((color, index) => (
                <div key={index} className='flex gap-2 mt-2'>
                  <input
                    type='text'
                    placeholder='Tên màu'
                    value={color.name}
                    onChange={(e) => {
                      const updatedColors = [...newCar.color]
                      updatedColors[index].name = e.target.value
                      setNewCar({ ...newCar, color: updatedColors })
                    }}
                    className='w-full p-2 border rounded'
                  />
                  <input
                    type='text'
                    placeholder='Mã màu (hex)'
                    value={color.value}
                    onChange={(e) => {
                      const updatedColors = [...newCar.color]
                      updatedColors[index].value = e.target.value
                      setNewCar({ ...newCar, color: updatedColors })
                    }}
                    className='w-full p-2 border rounded'
                  />
                  <input
                    type='text'
                    placeholder='URL hình ảnh màu'
                    value={color.image}
                    onChange={(e) => {
                      const updatedColors = [...newCar.color]
                      updatedColors[index].image = e.target.value
                      setNewCar({ ...newCar, color: updatedColors })
                    }}
                    className='w-full p-2 border rounded'
                  />
                </div>
              ))}
              <button
                onClick={handleAddColor}
                className='mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
              >
                Thêm màu
              </button>
            </div>

            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowAddForm(false)} className='bg-gray-500 text-white px-4 py-2 rounded mr-2'>
                Hủy
              </button>
              <button onClick={handleAddCar} className='bg-blue-500 text-white px-4 py-2 rounded'>
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit car form*/}
      {showEditForm && currentCar && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto'>
          <div className='bg-white p-6 rounded-lg w-full max-w-4xl my-8'>
            <h3 className='text-xl font-bold mb-4'>Sửa xe</h3>
            <div className='flex flex-wrap gap-4'>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Tên xe:</label>
                <input
                  type='text'
                  value={currentCar.name}
                  onChange={(e) => setCurrentCar({ ...currentCar, name: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Giá (VND):</label>
                <input
                  type='text'
                  value={currentCar.price}
                  onChange={(e) => setCurrentCar({ ...currentCar, price: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>URL hình ảnh chính:</label>
                <input
                  type='text'
                  value={currentCar.image[0]}
                  onChange={(e) => setCurrentCar({ ...currentCar, image: [e.target.value] })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Loại xe:</label>
                <input
                  type='text'
                  value={currentCar.type}
                  onChange={(e) => setCurrentCar({ ...currentCar, type: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Mô tả:</label>
                <textarea
                  value={currentCar.description}
                  onChange={(e) => setCurrentCar({ ...currentCar, description: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex items-center'>
                <label className='mr-2 font-medium'>Có sẵn:</label>
                <input
                  type='checkbox'
                  checked={currentCar.availability}
                  onChange={(e) => setCurrentCar({ ...currentCar, availability: e.target.checked })}
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Tốc độ tối đa (km/h):</label>
                <input
                  type='number'
                  value={currentCar.top_speed}
                  onChange={(e) => setCurrentCar({ ...currentCar, top_speed: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Thời gian sạc (phút):</label>
                <input
                  type='number'
                  value={currentCar.charging_time}
                  onChange={(e) => setCurrentCar({ ...currentCar, charging_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Chiều dài (cm):</label>
                <input
                  type='number'
                  value={currentCar.length}
                  onChange={(e) => setCurrentCar({ ...currentCar, length: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Chiều rộng (cm):</label>
                <input
                  type='number'
                  value={currentCar.width}
                  onChange={(e) => setCurrentCar({ ...currentCar, width: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Chiều cao (cm):</label>
                <input
                  type='number'
                  value={currentCar.height}
                  onChange={(e) => setCurrentCar({ ...currentCar, height: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Số chỗ ngồi:</label>
                <input
                  type='number'
                  value={currentCar.seating_capacity}
                  onChange={(e) => setCurrentCar({ ...currentCar, seating_capacity: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Dung lượng pin (kWh):</label>
                <input
                  type='number'
                  value={currentCar.battery_capacity}
                  onChange={(e) => setCurrentCar({ ...currentCar, battery_capacity: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Số túi khí:</label>
                <input
                  type='number'
                  value={currentCar.airbag}
                  onChange={(e) => setCurrentCar({ ...currentCar, airbag: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Thời gian sạc chuẩn (phút):</label>
                <input
                  type='number'
                  value={currentCar.standard_charge_time}
                  onChange={(e) => setCurrentCar({ ...currentCar, standard_charge_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
              <div className='flex-1 min-w-[300px] flex flex-col'>
                <label className='mb-1 font-medium'>Thời gian sạc nhanh (phút):</label>
                <input
                  type='number'
                  value={currentCar.fast_charge_time}
                  onChange={(e) => setCurrentCar({ ...currentCar, fast_charge_time: e.target.value })}
                  className='w-full p-2 mb-4 border rounded'
                />
              </div>
            </div>

            <div className='mt-4'>
              <h4 className='font-bold'>Màu sắc</h4>
              {currentCar.color.map((color, index) => (
                <div key={index} className='flex gap-2 mt-2'>
                  <div className='flex-1 flex flex-col'>
                    <label className='mb-1 font-medium'>Tên màu:</label>
                    <input
                      type='text'
                      value={color.name}
                      onChange={(e) => {
                        const updatedColors = [...currentCar.color]
                        updatedColors[index].name = e.target.value
                        setCurrentCar({ ...currentCar, color: updatedColors })
                      }}
                      className='w-full p-2 border rounded'
                    />
                  </div>
                  <div className='flex-1 flex flex-col'>
                    <label className='mb-1 font-medium'>Mã màu (hex):</label>
                    <input
                      type='text'
                      value={color.value}
                      onChange={(e) => {
                        const updatedColors = [...currentCar.color]
                        updatedColors[index].value = e.target.value
                        setCurrentCar({ ...currentCar, color: updatedColors })
                      }}
                      className='w-full p-2 border rounded'
                    />
                  </div>
                  <div className='flex-1 flex flex-col'>
                    <label className='mb-1 font-medium'>URL hình ảnh màu:</label>
                    <input
                      type='text'
                      value={color.image}
                      onChange={(e) => {
                        const updatedColors = [...currentCar.color]
                        updatedColors[index].image = e.target.value
                        setCurrentCar({ ...currentCar, color: updatedColors })
                      }}
                      className='w-full p-2 border rounded'
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddColorEdit}
                className='mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'
              >
                Thêm màu
              </button>
            </div>

            <div className='flex justify-end mt-4'>
              <button
                onClick={() => setShowEditForm(false)}
                className='bg-gray-500 font-medium text-white px-4 py-2 rounded mr-2'
              >
                Hủy
              </button>
              <button onClick={handleUpdateCar} className='bg-blue-500 font-medium text-white px-4 py-2 rounded'>
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------- */}
      <div className='flex flex-wrap gap-10 w-11/12 mt-20 pb-10'>
        {dataCar.map((item) => {
          return (
            <div
              className='flex cursor-pointer items-center overflow-hidden p-3 shadow-lg hover:shadow-2xl transition-shadow duration-300
              justify-center flex-col box-border border rounded-xl flex-1 basis-[calc(25%-50px)]'
              key={item.id}
            >
              <h3 className='font-medium'>{item.name}</h3>
              <h2>{item.price}</h2>
              <img
                src={item.image[0]}
                className='p-3 object-cover transform transition-transform duration-300 hover:scale-110'
                alt={item.name}
                onClick={() => handleClick(item)}
              />
              <div className='flex gap-5'>
                <button
                  onClick={handleScrollToRegister}
                  className='border rounded-md p-2 text-white bg-[#2d63ed] font-medium'
                >
                  Đăng ký lái thử
                </button>
                <button
                  onClick={handleScrollToContact}
                  className='border rounded-md p-2 text-[#2d63ed] border-[#2d63ed] bg-[#fff] font-medium'
                >
                  Liên hệ
                </button>
              </div>
              {/* Admin Buttons */}
              {isAdmin && (
                <div className='flex gap-3 mt-3'>
                  <button
                    onClick={() => handleEditCar(item)}
                    className='bg-yellow-500 font-medium text-white px-3 py-1 rounded hover:bg-yellow-600'
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDeleteCar(item.id)}
                    className='bg-red-500 font-medium text-white px-3 py-1 rounded hover:bg-red-600'
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <FormRegister ref={formRef} />
      <Footer ref={contactRef} />
    </div>
  )
}
