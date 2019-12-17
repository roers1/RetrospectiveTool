using System;
using System.Collections.Generic;
using System.Text;
using Moq;
using Retrospective_Core.Services;
using Retrospective_Core.Models;
using System.Linq;
using Retrospective_Back_End.Controllers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace Retrospective_Back_End_Test
{
    public class TestRetrospectiveController
    {
        [Fact]
        public void getAllRetrospectives()
        {
            //Arrange
            String testTitle = "Board 1";
            Mock<IRetroRespectiveRepository> mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
            var retrospectives = new QueryableList<Retrospective, Retrospective>()
            {
                new Retrospective { 
                    Title = testTitle,
                    Description = "Dit is board 1",
                    CreatedDate = DateTime.Now,
                    RetroColumns = new List<RetroColumn>()
                    {
                        new RetroColumn
                        { 
                            Title = "Kolom 1",
                            RetroCards = new List<RetroCard>()
                            {
                                new RetroCard 
                                {
                                    Content = "Dit is kaart 1",
                                    Position = 1
                                }
                            }
                        } 
                    }

                },
                new Retrospective
                {
                    Title = "Board 2",
                    Description = "Dit is board 2"
                }
            };

            mockRetrospectiveRepo.Setup(m => m.Retrospectives).Returns(retrospectives);
            RetrospectivesController controller = new RetrospectivesController(mockRetrospectiveRepo.Object);
            IList<Retrospective> list = new List<Retrospective>();





            //Act
            Task<ActionResult<IEnumerable<Retrospective>>> result = controller.GetRetrospectives();
            IList<Retrospective> oneRetrospective = list.Where(d => d.Title == testTitle).ToList<Retrospective>();

            foreach (var r in result.Result.Value)
            {
                
            }

                //Assert.True(result.IsCompleted, "Task should be completed");
                Console.WriteLine(oneRetrospective.Select(r => r.Title));
            string test = oneRetrospective.FirstOrDefault().Title;
            Assert.True(oneRetrospective.Select(r => r.Title).ToString().Equals("Board 1"));

        }
    }
}
