<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Category;
use AppBundle\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends Controller
{

    public function products(){
        $productRepository = $this->getDoctrine()->getRepository(Product::class);

        return $productRepository;
    }

    public function categories(){
        $categoryRepository = $this->getDoctrine()->getRepository(Category::class);

        return $categoryRepository;
    }

    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {

        $formProduct = new Product();
        $formBuilder = $this->createFormBuilder($formProduct)
            ->add('name', ChoiceType::class, [
                'choices' => [
                    'All Shoes' => 'All Shoes',
                    'Casual Sneaker' => 'Casual Sneaker',
                    'Sport' => 'Sport',
                    'Stylish' => 'Stylish',
                ]
            ])
            ->add('Submit', SubmitType::class);
        $form = $formBuilder->getForm();

        $formProductData = $request->request->get('form');
        //$showThis = $formProductData['name'];         

        return $this->render('ajax/index.html.twig', [
            'formProduct' => $form->createView(),
            'products' => $this->products()->findAll(),
            'categories' => $this->categories()->findAll(),
            'show' => $formProductData,
        ]);
    }

    /**
     * @Route("/ajax_category", name="ajax_category")
     */
    public function AjaxCategoryAction(Request $request){

        $category = $this->categories();
        $product = $this->products();

        $search = $request->get('info');
        $thisCategory = $category->findBy(['name' => $search]);
        $showThis = $product->findBy(['category' => $thisCategory]);

        $productData = [];
        foreach ($showThis as $product) {
            $productData[] = [
                'name' => $product->getName(),
                'image' => $product->getImage(),
                'category' => $product->getCategory()->getName(),
                'icon' => $product->getCategory()->getIcon(),
            ];
        }
        dump($productData);
        return new JsonResponse($productData);
    }

    /**
     * @Route("/ajax_name", name="ajax_name")
     */
    public function AjaxPost(Request $request){
        $search = $request->get("info");
        /** @var \AppBundle\Repository\ProductRepository $repository */
        $repository = $this->products();
        $products = $repository->findProduct($search);
        $jsonData = array();
        $idx = 0;
        foreach ($products as $product) {
            $temp = array(
                'name' => $product->getName(),
                'image' => $product->getImage(),
                'category' => array(
                    'name' => $product->getCategory()->getName(),
                    'icon' => $product->getCategory()->getIcon(),
                )
            );
            $jsonData[$idx++] = $temp;

        }
        return new JsonResponse($jsonData);
    }

}
