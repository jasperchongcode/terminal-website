import { VGG19_force_diagram_1000_images } from "../assets"

const SummerResearch = () => {
    return (
        <>
            <div className="py-2  gap-8 flex flex-col">
                <h1 className="font-bold text-base md:text-lg">Summer Research Project 2025: Exploring Large Image Datasets with Image Embeddings</h1>

                <p>
                    This was a six week program starting mid-january 2025, where I worked as a summer research scholar under Dr Sam Hames in UQ's Centre for Digital Cultures and Society, primarily aiming to understand if useful information could be extracted from the K-Nearest Neighbour (KNN) and Reverse K-Nearest Neighbour (RKNN) of image embeddings. Following this being answered, I worked to create a tool aimed at a group of programmers and non-programmers for analysis and exploration of large image datasets. For non-programmers this tool had to be easy to understand and utilise, and for programmers it had to be easy to edit and modular.
                </p>
                <p>

                    When constructing the workflow, the first step was to import images, this is done by adding a .zip file into the /input folder. This zip file should contain all the images you want to analyse, and it is fine to have nested folders and non-image files (they will simply be ignored).
                </p>
                <p>
                    The next step was to have a way to create a variety of image embeddings, this was done in a couple of ways:
                    1. Utilising multithreading and just iterating over each image (by default creates colour histogram embeddings)
                    2. Utilising batching for pytorch models (such as VGG16, etc.)
                    3. Utilising batching with a library for implementing OpenAI's CLIP model (imgbeddings)
                    These embeddings are cached as numpy files.
                </p>
                <p>

                    It was discovered that useful information could be extracted, such as observing the imbalance in RKNN counts (as in some images appear as nearest neighbours significantly more than others), and in listing the images in order of their RKNN counts. The latter was displayed in a HTML file which can be downloaded and shared.
                </p>
                <p>
                    In the next iterations, K-Means Clustering was added as an additional way to explore the images. In addition, a force directed diagram was made using a spring simulation. This created a node for each image, and then attached edges between each image and its KNN, with the weight of the edge (proportional to the force it will apply) being the inverse of the distance between the two neighbours (with a very small number added to prevent dividing by zero). This visualisation was very effective at summarising large amounts of data, and it was interesting to observe the hotspots and "arms" that tended to appear.
                </p>
                <div id="diagram" className="">
                    <label> VGG19 force directed diagram for 1000 instagram images
                        <img className="image" src={VGG19_force_diagram_1000_images} alt="VGG19 force directed diagram for 1000 instagram images" />
                    </label>
                </div>
                <p>
                    To extend on this visualisation, it was made to be interactive, allowing users to hover over points to see the index number of the image (allowing someone to find which image this point represents). This diagram was eventually added to the HTML file, where an image could be selected to display what the image looks like on the side, or groups of images could be selected to show them all in a grid pattern (this selection would also filter the table with all image information below). It was observed that different embeddings models placed different sorts of items as "central" within the force diagram (e.g. CLIP puts humans central), and different sorts of items in their own arms and clusters. Burger, Pizza, furniture, and computer graphics clusters and arms were commonly observed across many embeddings.
                </p>
                <p>
                    This HTML is fully standalone meaning it does not require anything external to be run once it is created. An example of these HTML files for 200 of my images can be found <a href="https://github.com/jasperchongcode/summer-research-html-output" className="link" target="_blank">here</a>.


                </p>
                <p>
                    Overall, I have learnt a ton in this project and am very thankful for the opportunity. If you wish to learn more and maybe use this tool yourself, the github repository can be found <a href="https://github.com/Language-Research-Technology/exploring-knn" className="link" target="_blank">here</a>, with detailed explanations, comments, and docstrings.
                </p>

            </div>
        </>
    );
}

export default SummerResearch;