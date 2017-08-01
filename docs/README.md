# Platform Category Definitions

* At https://github.com/evaristoc/fCC_R3_DataAnalysis/blob/development/docs/category_operationalization.csv

# Subjects

* ['getting started', 'responsive web design', 'javascript algorithms data structures', 'front end libraries', 'data visualization', 'apis microservices', 'information security quality assurance', 'contribute open source help nonprofits', 'coding interview questions take home assignments']


# Firebase Schema (last update: 14 Jul 2017):

Comments:
* userstable added
* table name "cv" changed into "fcc_subjects"
* table name "categories" changed into "plt_categories" (for platform categories)


------------------------


platformstable (an object) --->

            www--example--com ($key, an object):

                   origurl : www.example.com (original form of the url before modifying it for technical restrictions)

                   category: (category of the platform: tutorial, blog, etc)

                   prevalence: (a list of numbers used for the calculation of the popularity ranking; might rename into a intuitive name)

                   minsecurity, crawlstatus, created, modified : not important for rendering

                   title, description, keywords: bot data about the url, used for classification; can be used for providing additional info

                   params: a list of params associated to the url; will be rendered in detail platform page ordered by relevance

                   textids: ids of the comments in the textstable that contain this url

                   users: list of users in the userstable that commented this url

                   subjects (analysed based on FCC subjects, $key, an object):
                                        subject1 (use correct name here!, $key, an object):
                                                    count: number of words that matched the words associated to this subject
                                                    proportion: normalised proportion of matching words in this subect compared to the rest of subjects
                                        subject2 (same as above):
                                                    count: ....
                                                    proportion: ...
                                        subject3 :
                                                    ....
                                            ...
                                        subjectn:
                                                    ....

------------------------


userstable (an object) --->

            user1 ($key): list of urls that users mentioned

            user2 ($key): ....

            ....

------------------------

plt_categories (a list) --->

            category1, category2, category3, ....


--------------------------

fcc_subjects (hmmm...forgot the type.) ---> 

            [position in the FCC cv, name of the subject, list of words associated to this subject, length of the list of words]

--------------------------

textstable (an object) --->

             id (as assigned by Gitter, $key, object):

                       text: content

                       source: which chatroom the message was found

                       user: who posted this message

                       sent: date the user posted the message

                       prestige: (to be calculated, on hold)  

                       urls: object of urls found in this message, as calculated by Gitter

                       created, modified : not for rendering

                       platforms : object of urls again but this will be used as the key to find the platforms in the platformstable
                                       www--example--com : "sentiment" (where sentiment is on hold, to be calculated)
