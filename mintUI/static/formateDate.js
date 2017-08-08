//格式化时间     2017-03-09 12:32:34


function formatDate(time){
	var now=new Date(time);
	var year=now.getFullYear();
	var month=now.getMonth()+1;
	var date=now.getDate();
	var hour=now.getHours();
	var minute=now.getMinutes();
	var second=now.getSeconds();
	return year+'-'+fixZero(month)+'-'+fixZero(date)+'  '+fixZero(hour)+':'+fixZero(minute)+':'+fixZero(second);
}

function fixZero(num){
	if (parseInt(num)<10) {
		return '0'+num;
	}else{
		return num;
	}
}
