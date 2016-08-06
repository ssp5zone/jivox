<?php /**  User Model */
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * User Model.
 * Takes care of all the data pulls for the logged in user.
 */
class User_model extends CI_Model {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function login($username,$password)
	{
		$result = $this->db->query("SELECT * FROM user WHERE username='$username'");
		if ($result->num_rows()>0){
			$result = $this->db->select('*')->get_where('user',array('username'=>$username,'password'=>$password));
			if ($result->num_rows()>0){
				$userData = $result->row_array();	
				$userData['status'] = 'success';
			} else {
				$userData['status'] = 'Password incorrect';
			}
		} else {
			$userData['status'] = 'Sorry you dont have account';
		}
		return $userData;
	}
}

/* End of file user_model.php */
/* Location: ./application/models/user_model.php */