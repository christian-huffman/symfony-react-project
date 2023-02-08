<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RegisterUserController extends AbstractController
{
    /**
     * @Route("/register/user", name="app_register_user")
     */
    public function index(): Response
    {
        return $this->render('register_user/index.html.twig', [
            'controller_name' => 'RegisterUserController',
        ]);
    }

    /**
     * @Route("/api/register", methods={"POST"}, name="register_user")
     */
    public function newUser(Request $request, EntityManagerInterface $em)
    {
        $postData = json_decode($request->getContent(), true);
        $user = new User();
        $user->setEmail($postData['email']);
        $user->setPassword($postData['password']);
        $userRepository = $em->getRepository(User::class);
        $userRepository->add($user, true);
        $response =  new Response();
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode([
            "id" => $user->getId(),
            "email" => $user->getEmail(),
            "password" => $user->getPassword(),
        ]));
        return $response;
    }
}
