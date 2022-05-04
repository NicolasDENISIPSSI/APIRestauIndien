<?php
namespace App\Controller;

use App\Model\ClientsModel;
use Core\Controller\DefaultController;

class ClientsController extends DefaultController {


    public function index(): void
    {
        $this->jsonResponse((new ClientsModel())->findAll());
    }
    public function __construct()
    {
        $this->model = new ClientsModel;
    }

    /**
     * Génère une apikey pour un nouveau client
     *
     * @param array $client
     * @return void
     */
    public function save (array $client): void
    {
        // Génère l'apikey
        $apikey = md5(uniqid());
        $client['apikey'] = $apikey;
        // Stocke le client
        $lastId = $this->model->saveClient($client);
        // Retourne l'apikey
        $this->jsonResponse($this->model->find($lastId));
    }
    public function signup(): void
    {
        if(isset($_POST['nom'],$_POST['tel'],$_POST['mail'],$_POST['pwd'])){
           
            $user = $_POST;
            $user['password'] = password_hash($user['password'],PASSWORD_DEFAULT);
            
            $lastId = $this->model->saveUser($user);

            $this->jsonResponse($this->model->find($lastId));
        }
    }

    public function login(array $userData): void
    {
        $user = $this->model->getUserByEmail($userData['mail']);
        if ($user){
            if(password_verify($userData['pwd'],$user->getPassword())){

                $this->jsonResponse((new JwTokenSecurity)->generateToken($user->jsonSerialize()));
            }else{
                $this->jsonResponse("Mot de pass incorrect",400);
            }
        }else{
            $this->jsonResponse("Cet utilisateur n'est pas inscrit, veuillez vous inscrire", 400);
        }
    }
}