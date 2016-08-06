<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Login controller
	 */
	
	public function index()
	{
		$this->load->library('session');
		$this->load->view('login');
	}
	public function login_process()
	{
		if ($this->input->is_ajax_request()){
			#Clean the username and password
			$username=$this->security->xss_clean($this->input->post('username'));
			$password=$this->security->xss_clean($this->input->post('password'));
			$this->load->model('user_model');
			$log = $this->user_model->login($username,$password);
			if($log['status']=='success')
			{
				$this->load->library('session');
				$sessionData = array(
				   'username'  	=> $log['username'],
				   'name'	 	=> $log['name']
				);
				$this->session->set_userdata($sessionData);					
			} else {
				$this->output->set_content_type('application/json')->set_output(json_encode($log['status']));
			}

		} else {
			$this->output->set_content_type('application/json')->set_output(json_encode('Please check your Username and Password'));
		}
	}
}
