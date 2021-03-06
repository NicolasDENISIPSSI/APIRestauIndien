<?php
namespace App\Security;

use App\Model\ClientsModel;
use Core\Traits\JsonTrait;

class ApiKeySecurity {
    
    /**
     * verifyApiKey permet de vérifier si la clé api est valide
     *
     * @return bool
     */
    public static function verifyApiKey (): bool
    {
        if(isset($_GET['apikey']) && !empty($_GET['apikey'])){
            $clientModel = new ClientsModel();
            if ($_GET['apikey']=="test") {
                return true;
            } else {
                http_response_code(403);
                echo json_encode("Vous n'avez pas les droits pour accéder à cette api");
                // self::jsonResponse("Vous n'avez pas les droits pour accéder à cette api", 403);
            }
        } else {
            http_response_code(400);
            echo json_encode("Apikey manquante");
            // self::jsonResponse("Apikey manquante", 400);
        }
        return false;
    }
}