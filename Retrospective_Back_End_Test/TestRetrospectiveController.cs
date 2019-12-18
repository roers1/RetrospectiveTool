using System;
using System.Collections.Generic;

using Moq;
using System.Linq;
using Retrospective_Back_End.Controllers;
using Xunit;
using Retrospective_Core.Services;
using Retrospective_Core.Models;

namespace Retrospective_Back_End_Test {
    public class TestRetrospectiveController
    {
        Mock<IRetroRespectiveRepository> mockRetrospectiveRepo;
        IList<Retrospective> retrospectives;
        public TestRetrospectiveController()
        {
           this.mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
            this.retrospectives = new List<Retrospective>()
            {
                new Retrospective {
                    Title = "Board 1",
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
        }

        [Fact]
        public async void getAllRetrospectives()
        {
            //Arrange
            String testTitle = "Board 1";

            mockRetrospectiveRepo.Setup(m => m.getAll()).Returns(retrospectives.AsQueryable());
            var controller = new RetrospectivesController(mockRetrospectiveRepo.Object);

            //Act
           var result = await controller.GetRetrospectives();

            //Assert
            Console.WriteLine(result);
            var test = result.Value.FirstOrDefault().Title;
            Assert.True(test.Equals("Board 1"));
            Assert.Equal(2, retrospectives.Count());

        }
    }
}
