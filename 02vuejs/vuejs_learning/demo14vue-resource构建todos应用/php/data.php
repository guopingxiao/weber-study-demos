<?php 

	$data = array(
				array('text' =>'Learn JavaScript', 'completed' =>true),
				array('text' =>'Learn JavaScript', 'completed' =>false),
				array('text' =>'Learn JavaScript', 'completed' =>true)
				);
	array_push($data,array('text'=>$_POST['text'],'completed'=>$_POST['completed']));
	echo json_encode($data);

 ?>