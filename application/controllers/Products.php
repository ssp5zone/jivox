<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Products extends CI_Controller {

	/**
	 * Products controller
	 */
	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->load->helper('url');
		$this->load->model('Product_model');
		/*if (!$this->session->userdata('username')){
			redirect(base_url('welcome/logout'),'refresh');
		}*/
	}

	/*
	 * Get Product details
	 */
	public function product()
	{		
		$data=$this->Product_model->product();
		$this->load->view('product');
		//print_r($data);
	}

	/*
	 * Get Particular product reviews
	 */
	public function review($id=null)
	{
		$data['review']=$this->Product_model->review();
		$data['id']=$id;
		$this->load->view('review',$data);
		//print_r($data);
	}

	/*
	 * Adding reviews
	 */
	public function add_review()
	{
		$id = $this->input->post('rev_id');
		if(!empty($id)){
			$comment=$this->Product_model->review($id,'insert');
			$this->output->set_content_type('application/json')->set_output(json_encode($comment));
		} else {
			$this->output->set_status_header(412,'Action Failed')->set_output("Sorry, Refresh your page and try again");
		}
	}

}
