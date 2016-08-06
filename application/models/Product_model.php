<?php /**  User Model */
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * User Model.
 * Takes care of all the data pulls for the logged in user.
 */
class Product_model extends CI_Model {
	
	public function __construct()
	{
		parent::__construct();
		$this->load->database();
	}

	public function product()
	{
		$result = $this->db->select('*')
						   ->from('product')
						   ->get()
						   ->result_array();
			
		return $result;
	}
	public function review($id=null,$type=null)
	{
		if($type=='insert') {
			$new_rev = $this->input->post('addRev');
			$this->db->insert('reviews',array('prod_id' => $id,'review'=>$new_rev,'createdby'=>$_SESSION['username']));
			$last_insert=$this->db->insert_id();
			return $this->db->query("select createdby,timestamp from reviews where id='$last_insert'")->row_array();
		}
		$result = $this->db->select('*')
						   ->from('reviews')
						   ->get()
						   ->result_array();
			
		return $result;
	}
}

/* End of file user_model.php */
/* Location: ./application/models/user_model.php */