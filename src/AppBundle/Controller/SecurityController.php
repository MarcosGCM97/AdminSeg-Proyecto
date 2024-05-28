<?php
// src/AppBundle/Controller/SecurityController.php
namespace AppBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends Controller
{
    /**
     * @Route("/login", name="login")
     */
    public function loginAction(AuthenticationUtils $authenticationUtils, SessionInterface $session)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $show = 'show';
        // check if the user is logged in
        if ($this->getUser()) {
            // the user is logged in, you can set a session variable
            $show = 'notshow';
            $session->set('user', $this->getUser()->getUsername());
        }

        return $this->render('security/login.html.twig', [
            'last_username' => $lastUsername,
            'error'         => $error,
            'show'          => $show,
        ]);
    }

    /**
     * @Route("/logout", name="logoutForm")
     */
    public function logoutAction()
    {
        return $this->redirectToRoute('login');
    }
}

?>