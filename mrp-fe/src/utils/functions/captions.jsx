const captions = (time) => {
    console.log(time)
    if(time === 1){
        return "Trabajado en total"
    }else if(120 > time && time > 59){
        return "Trabajado en total"
    }else if(time === 3600){
        return "Trabajada en total"
    }
    return "Trabajados en total"
}

export default captions;