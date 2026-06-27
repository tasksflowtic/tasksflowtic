export const reminderTask = (task) => {
    const today = new Date()
    const endTime = new Date(`${task?.dueDate}T${task?.endtime}`)
    const diff = (endTime.getTime() - today.getTime()) / 1000 / 60
    const roundValue = Math.round(diff)
    if(diff <= 30){
        return roundValue
    }
    return;
}