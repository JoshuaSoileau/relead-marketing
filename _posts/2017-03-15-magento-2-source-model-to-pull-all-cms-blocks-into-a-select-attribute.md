---
layout: post
title: Magento 2 Source Model to Pull All CMS Blocks into a Select Attribute
description: How to create a product attribute whose source model will pull a collection of all available CMS blocks
categories: articles
date: 2017-03-15
tags: [magento 2, source model, install script, cms]
keywords: [magento 2, source model, install script, cms blocks]
image:
---

I recently had to create a product attribute that would pull in all of the available CMS blocks on the site.
I remember you could do it pretty easily on M1, but M2 didn't have a well documented way or example to follow.

Luckily I found an example of it for the category attributes "landing_page", which lets you choose a CMS block to display on category pages.

The source model you want to use is `Magento\Catalog\Model\Category\Attribute\Source\Page`. Yes, it's namespaced to the Category model. And I'm using it on something not related to Categories. That's M2 for you.

Here's the script:

```
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Catalog\Model\Product;
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Setup\EavSetupFactory;


class InstallData implements InstallDataInterface
{
    /**
     * @var EavSetupFactory
     */
    private $eavSetupFactory;

    /**
     * @var Setup\SampleData\Executor
     */
    protected $executor;

    /**
     * @var Installer
     */
    protected $installer;

    /**
     * InstallData constructor.
     * @param BlockFactory $modelBlockFactory
     * @param PageFactory $pageFactory
     */
    public function __construct(
        EavSetupFactory $eavSetupFactory
    ) {
        $this->eavSetupFactory = $eavSetupFactory;
    }

    /**
     * @param ModuleDataSetupInterface $setup
     * @param ModuleContextInterface $moduleContext
     */
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $eavSetup = $this->eavSetupFactory->create(['setup' => $setup]);
        $eavSetup->removeAttribute(Product::ENTITY, 'some_cms_block');
        $eavSetup->addAttribute(
            Product::ENTITY,
            'some_cms_block',
            [
                'backend' => '',
                'type' => 'int',
                'frontend' => '',
                'input' => 'select',
                'label' => 'Choose a CMS Block',
                'source' => 'Magento\Catalog\Model\Category\Attribute\Source\Page',
                'required' => false,
                'user_defined' => true,
                'unique' => false,
                'global' => ScopedAttributeInterface::SCOPE_GLOBAL,
                'input_renderer' => '',
                'searchable' => false,
                'filterable' => false,
                'comparable' => false,
                'visible_on_front' => false,
                'is_html_allowed_on_front' => false,
                'visible_in_advanced_search' => false,
                'used_in_product_listing' => true,
                'used_for_sort_by' => false,
                'apply_to' => '',
                'position' => '8',
                'used_for_promo_rules' => false,
                'is_used_in_grid' => false,
                'is_visible_in_grid' => false,
                'is_filterable_in_grid' => false,
                'group' => 'Content',
            ]
        );
    }
}
```
