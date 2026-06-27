import React, { useState } from 'react'
import Category from '../../Config/CategoryApi'

const TaskCategoryUi = ({ settask, task, setcanUpdate}) => {

    const taskcategory = Category
    const [curcategory, setcurcategory] = useState()

    const handlecategory = (category) => {
        setcurcategory(category)
        settask(prev => ({...prev, category: category.name}))
    }

    return (
        <div className='wrapper-category-page'>
            <p className='cur-category'>Category: <span style={{color:curcategory?.text}}>{task?.category}</span></p>
            <div className='task-category'>
            {
                taskcategory.map((category, index) => {
                    return (
                        <div className='categorybox' onClick={()=>handlecategory(category)} style={{background:category?.bg, color:category?.text}}>
                            <span style={{marginRight:'5px'}}>{category?.icon}</span>
                            <p>{category?.name}</p>
                        </div>
                    )
                })
            }
        </div>
        </div>
    )
}

export default TaskCategoryUi
