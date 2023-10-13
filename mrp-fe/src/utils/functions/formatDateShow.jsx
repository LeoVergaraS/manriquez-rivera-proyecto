const formatDateShow = (date) => {
    if (date === null) return ""
    const fechaDate = date.split("-")
    let dd = fechaDate[2];
    let mm = fechaDate[1];
    let yyyy = fechaDate[0];
    return dd + "/" + mm + "/" + yyyy;
}

export default formatDateShow;

