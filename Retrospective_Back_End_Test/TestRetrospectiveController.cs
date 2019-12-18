using System;
using System.Collections.Generic;
using Moq;
using System.Linq;
using Retrospective_Back_End.Controllers;
using Xunit;
using Retrospective_Core.Services;
using Retrospective_Core.Models;
using Xunit.Abstractions;

namespace Retrospective_Back_End_Test {
    public class TestRetrospectiveController
    {
	    private readonly ITestOutputHelper _testOutputHelper;
	    readonly Mock<IRetroRespectiveRepository> _mockRetrospectiveRepo;
	    readonly IList<Retrospective> _retrospectives;
        public TestRetrospectiveController(ITestOutputHelper testOutputHelper)
        {
	        _testOutputHelper = testOutputHelper;
	        this._mockRetrospectiveRepo = new Mock<IRetroRespectiveRepository>();
            this._retrospectives = new List<Retrospective>()
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
        public async void GetAllRetrospectives()
        {
            //Arrange

            _mockRetrospectiveRepo.Setup(m => m.getAll()).Returns(_retrospectives.AsQueryable());
            var controller = new RetrospectivesController(_mockRetrospectiveRepo.Object);

            //Act
           var result = await controller.GetRetrospectives();

            //Assert
            var test = result.Value.FirstOrDefault()?.Title;
            Assert.True(test != null && test.Equals("Board 1"));
            Assert.Equal(2, _retrospectives.Count());
        }
    }
}
