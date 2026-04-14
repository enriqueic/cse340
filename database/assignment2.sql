-- Task One
--#1
-- Data for table `classification`
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

--#2 
--SELECT * FROM public.account;
UPDATE public.account
SET account_type = 'Admin'
WHERE account_email = 'tony@starkent.com' AND account_id = 1;

--#3
DELETE FROM public.account
WHERE account_id = 1

--#4
--SELECT * FROM public.inventory;
UPDATE
  public.inventory
SET
   inv_description = REPLACE(inv_description, 'the small interiors', 'a huge interior')
WHERE
  inv_id = 10;

--#5
SELECT public.inventory.inv_make, public.inventory.inv_model FROM public.inventory
INNER JOIN public.classification
ON public.inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';

--#6
UPDATE
  public.inventory
SET
   inv_image = REPLACE(inv_image, 'images/', 'images/vehicles/'),
   inv_thumbnail = REPLACE(inv_thumbnail, 'images/', 'images/vehicles/')
